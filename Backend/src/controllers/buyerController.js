const { Order, Batch, Commodity, Distribution, User, ActivityLog } = require('../models');

// Get available batches in marketplace
const getAvailableBatches = async (req, res, next) => {
    try {
        const batches = await Batch.findAll({
            where: { status: ['available', 'distributed'] },
            include: [
                { model: Commodity, as: 'commodity' },
                { model: User, as: 'farmer', attributes: ['id', 'name', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: batches });
    } catch (error) {
        next(error);
    }
};

// Get batch trace (full supply chain history)
const getBatchTrace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const batch = await Batch.findByPk(id, {
            include: [
                { model: Commodity, as: 'commodity' },
                { model: User, as: 'farmer', attributes: ['id', 'name', 'email'] },
                {
                    model: Distribution, as: 'distributions',
                    include: [
                        { model: User, as: 'distributor', attributes: ['id', 'name', 'email'] },
                        { model: User, as: 'distributionBuyer', attributes: ['id', 'name', 'email'] }
                    ]
                },
                {
                    model: Order, as: 'orders',
                    include: [{ model: User, as: 'buyer', attributes: ['id', 'name', 'email'] }]
                }
            ]
        });

        if (!batch) {
            return res.status(404).json({ success: false, message: 'Batch not found' });
        }

        res.json({ success: true, data: batch });
    } catch (error) {
        next(error);
    }
};

// Create order
const createOrder = async (req, res, next) => {
    try {
        const { batch_id, price, quantity } = req.body;
        if (!batch_id || !price || !quantity) {
            return res.status(400).json({ success: false, message: 'batch_id, price, and quantity are required' });
        }

        const batch = await Batch.findByPk(batch_id);
        if (!batch) {
            return res.status(404).json({ success: false, message: 'Batch not found' });
        }

        if (quantity > batch.quantity) {
            return res.status(400).json({ success: false, message: 'Order quantity exceeds available batch quantity' });
        }

        const order = await Order.create({
            batch_id,
            buyer_id: req.user.id,
            price,
            quantity,
            status: 'pending'
        });

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'ORDER_CREATED',
            description: `Order created for batch ${batch.batch_code}, quantity: ${quantity}`
        });

        res.status(201).json({ success: true, message: 'Order created successfully', data: order });
    } catch (error) {
        next(error);
    }
};

// Get buyer's orders
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { buyer_id: req.user.id },
            include: [
                {
                    model: Batch, as: 'batch',
                    include: [
                        { model: Commodity, as: 'commodity' },
                        { model: User, as: 'farmer', attributes: ['id', 'name', 'email'] }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
};

// Get buyer dashboard
const getDashboard = async (req, res, next) => {
    try {
        const totalOrders = await Order.count({ where: { buyer_id: req.user.id } });
        const pendingOrders = await Order.count({ where: { buyer_id: req.user.id, status: 'pending' } });
        const completedOrders = await Order.count({ where: { buyer_id: req.user.id, status: 'completed' } });

        const recentOrders = await Order.findAll({
            where: { buyer_id: req.user.id },
            include: [
                {
                    model: Batch, as: 'batch',
                    include: [{ model: Commodity, as: 'commodity' }]
                }
            ],
            order: [['created_at', 'DESC']],
            limit: 5
        });

        res.json({
            success: true,
            data: {
                totalOrders,
                pendingOrders,
                completedOrders,
                recentOrders
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAvailableBatches, getBatchTrace, createOrder, getOrders, getDashboard };
