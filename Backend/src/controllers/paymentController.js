const midtransClient = require('midtrans-client');
const { Order, Product, Batch, User, ActivityLog } = require('../models');

// Configure Midtrans
const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_SERVER_KEY ? !process.env.MIDTRANS_SERVER_KEY.startsWith('SB-') : false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xX1z9gUjXn0R1vMzT6i1y1z1',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-xX1z9gUjXn0R1vMzT6i1y1z1'
});

const createPaymentToken = async (req, res, next) => {
    try {
        const { product_id, quantity, distributor_id, distance, distance_unit } = req.body;

        if (!product_id || !quantity) {
            return res.status(400).json({ success: false, message: 'product_id and quantity are required' });
        }

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ success: false, message: 'Order quantity exceeds available stock' });
        }

        const price = product.price * quantity;

        // Calculate delivery fee
        let delivery_fee = 0;
        if (distributor_id && distance) {
            const distributor = await User.findByPk(distributor_id);
            if (distributor && distributor.role === 'distributor') {
                const feePerKm = distributor.delivery_fee_per_km || 0;
                const distanceInKm = distance_unit === 'm' ? (parseFloat(distance) / 1000) : parseFloat(distance);
                delivery_fee = Math.round(feePerKm * distanceInKm);
            }
        }

        const total_price = price + delivery_fee;

        const order = await Order.create({
            product_id,
            buyer_id: req.user.id,
            distributor_id: distributor_id || null,
            delivery_fee,
            price: total_price, // Save the total price including delivery for Midtrans
            quantity,
            status: 'pending',
            payment_status: 'unpaid'
        });

        const buyer = await User.findByPk(req.user.id);

        let parameter = {
            transaction_details: {
                order_id: `ORDER-${order.id}-${Date.now()}`,
                gross_amount: total_price
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: buyer.name,
                email: buyer.email
            }
        };

        const transaction = await snap.createTransaction(parameter);
        const transactionToken = transaction.token;
        const transactionUrl = transaction.redirect_url;

        await order.update({
            midtrans_token: transactionToken,
            payment_url: transactionUrl
        });

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'ORDER_CREATED',
            description: `Order created for product ${product.name}, quantity: ${quantity}`
        });

        res.status(201).json({ success: true, message: 'Order created', data: { order, token: transactionToken, redirect_url: transactionUrl } });
    } catch (error) {
        next(error);
    }
};

const midtransWebhook = async (req, res) => {
    try {
        const statusResponse = await snap.transaction.notification(req.body);
        const orderIdString = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        // Parse order_id: ORDER-${order.id}-${timestamp}
        const orderIdMatch = orderIdString.match(/ORDER-(\d+)-/);
        if (!orderIdMatch) return res.status(200).send('OK');

        const orderId = orderIdMatch[1];
        const order = await Order.findByPk(orderId, {
            include: [{ model: Product, as: 'product' }]
        });

        if (!order) return res.status(200).send('OK');

        let isSuccess = false;

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                // Ignore challenge
            } else if (fraudStatus == 'accept') {
                isSuccess = true;
            }
        } else if (transactionStatus == 'settlement') {
            isSuccess = true;
        } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
            await order.update({ payment_status: 'failed' });
        } else if (transactionStatus == 'pending') {
            await order.update({ payment_status: 'unpaid' });
        }

        if (isSuccess && order.payment_status !== 'paid') {
            await order.update({ payment_status: 'paid', status: 'confirmed' });
            // Deduct product stock here
            if (order.product) {
                await order.product.update({ stock: order.product.stock - order.quantity });
            }
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error');
    }
};

module.exports = {
    createPaymentToken,
    midtransWebhook
};
