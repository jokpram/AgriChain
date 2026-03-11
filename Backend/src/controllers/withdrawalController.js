const { Withdrawal, Order, Product, User, ActivityLog } = require('../models');

// Get farmer balance and withdrawals
const getWithdrawalDashboard = async (req, res, next) => {
    try {
        const farmerId = req.user.id;

        // Calculate balance: Sum of all paid orders belonging to farmer's products, minus processed withdrawals
        // 1. Get total earnings
        const paidOrders = await Order.findAll({
            where: { payment_status: 'paid' },
            include: [{
                model: Product,
                as: 'product',
                where: { farmer_id: farmerId }
            }]
        });

        const totalEarnings = paidOrders.reduce((sum, order) => sum + order.price, 0);

        // 2. Get total withdrawn or pending
        const withdrawals = await Withdrawal.findAll({
            where: { farmer_id: farmerId }
        });

        const totalWithdrawn = withdrawals
            .filter(w => w.status === 'processed')
            .reduce((sum, w) => sum + w.amount, 0);

        const pendingWithdrawal = withdrawals
            .filter(w => w.status === 'pending')
            .reduce((sum, w) => sum + w.amount, 0);

        const availableBalance = totalEarnings - totalWithdrawn - pendingWithdrawal;

        res.json({
            success: true,
            data: {
                totalEarnings,
                availableBalance,
                totalWithdrawn,
                pendingWithdrawal,
                withdrawals
            }
        });
    } catch (error) {
        next(error);
    }
};

// Request withdrawal
const requestWithdrawal = async (req, res, next) => {
    try {
        const farmerId = req.user.id;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Validate balance (re-calculate on the fly for safety)
        const paidOrders = await Order.findAll({
            where: { payment_status: 'paid' },
            include: [{
                model: Product,
                as: 'product',
                where: { farmer_id: farmerId }
            }]
        });

        const totalEarnings = paidOrders.reduce((sum, order) => sum + order.price, 0);

        const withdrawals = await Withdrawal.findAll({
            where: { farmer_id: farmerId, status: ['processed', 'pending'] }
        });

        const usedBalance = withdrawals.reduce((sum, w) => sum + w.amount, 0);
        const availableBalance = totalEarnings - usedBalance;

        if (amount > availableBalance) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' });
        }

        const withdrawal = await Withdrawal.create({
            farmer_id: farmerId,
            amount,
            status: 'pending'
        });

        await ActivityLog.create({
            user_id: farmerId,
            action: 'WITHDRAWAL_REQUESTED',
            description: `Requested withdrawal of ${amount}`
        });

        res.status(201).json({ success: true, message: 'Withdrawal requested successfully', data: withdrawal });
    } catch (error) {
        next(error);
    }
};

// Admin approves/processes withdrawal
const processWithdrawal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'processed' or 'rejected'

        if (!['processed', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const withdrawal = await Withdrawal.findByPk(id, {
            include: [{ model: User, as: 'farmer', attributes: ['id', 'name', 'email'] }]
        });

        if (!withdrawal) {
            return res.status(404).json({ success: false, message: 'Withdrawal not found' });
        }

        await withdrawal.update({ status });

        await ActivityLog.create({
            user_id: req.user.id, // admin id
            action: `WITHDRAWAL_${status.toUpperCase()}`,
            description: `Withdrawal ${id} marked as ${status}`
        });

        res.json({ success: true, message: `Withdrawal marked as ${status}`, data: withdrawal });
    } catch (error) {
        next(error);
    }
};

// Admin get all withdrawals
const getAllWithdrawals = async (req, res, next) => {
    try {
        const withdrawals = await Withdrawal.findAll({
            include: [{ model: User, as: 'farmer', attributes: ['id', 'name', 'email'] }],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: withdrawals });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWithdrawalDashboard,
    requestWithdrawal,
    processWithdrawal,
    getAllWithdrawals
};
