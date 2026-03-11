const { User, Batch, Distribution, ActivityLog, Commodity, Order } = require('../models');
const { Op } = require('sequelize');

// Dashboard stats
const getDashboardStats = async (req, res, next) => {
    try {
        const totalFarmers = await User.count({ where: { role: 'petani' } });
        const totalDistributors = await User.count({ where: { role: 'distributor' } });
        const totalBuyers = await User.count({ where: { role: 'pembeli' } });
        const totalBatches = await Batch.count();
        const totalDistributions = await Distribution.count();
        const totalOrders = await Order.count();
        const totalProducts = await Product.count();
        const activeBatches = await Batch.count({ where: { status: 'available' } });
        const totalUsers = await User.count({ where: { role: { [Op.ne]: 'admin' } } });

        // Calculate Total Revenue (only paid orders)
        const revenueResult = await Order.sum('price', { where: { payment_status: 'paid' } });
        const totalRevenue = revenueResult || 0;

        res.json({
            success: true,
            data: {
                totalFarmers,
                totalDistributors,
                totalBuyers,
                totalUsers,
                totalBatches,
                activeBatches,
                totalDistributions,
                totalOrders,
                totalProducts,
                totalRevenue
            }
        });
    } catch (error) {
        next(error);
    }
};

// Dashboard stats
// ... (existing getDashboardStats)
// Create new user (Admin only)
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
        }

        if (!['petani', 'distributor', 'pembeli', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Role tidak valid' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
        }

        const user = await User.create({ name, email, password, role });

        await ActivityLog.create({
            user_id: req.user.id, // Admin ID
            action: 'USER_CREATED',
            description: `Admin menambahkan pengguna baru: ${name} (${role})`
        });

        res.status(201).json({
            success: true,
            message: 'Pengguna berhasil dibuat',
            data: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};

// List all users
const getUsers = async (req, res, next) => {
    try {
        const { role, status } = req.query;
        const where = { role: { [Op.ne]: 'admin' } };
        if (role) where.role = role;
        if (status) where.status = status;

        const users = await User.findAll({
            where,
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });

        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// Suspend or activate user
const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['active', 'suspended'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status. Use active or suspended' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ success: false, message: 'Cannot modify admin status' });
        }

        await user.update({ status });

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'USER_STATUS_UPDATE',
            description: `Admin ${status === 'suspended' ? 'suspended' : 'activated'} user ${user.name} (${user.email})`
        });

        res.json({ success: true, message: `User ${status} successfully`, data: user });
    } catch (error) {
        next(error);
    }
};

// Get all batches
const getAllBatches = async (req, res, next) => {
    try {
        const batches = await Batch.findAll({
            include: [
                { model: User, as: 'farmer', attributes: ['id', 'name', 'email'] },
                { model: Commodity, as: 'commodity' }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: batches });
    } catch (error) {
        next(error);
    }
};

// Get all distributions
const getAllDistributions = async (req, res, next) => {
    try {
        const distributions = await Distribution.findAll({
            include: [
                {
                    model: Batch, as: 'batch',
                    include: [{ model: Commodity, as: 'commodity' }]
                },
                { model: User, as: 'distributor', attributes: ['id', 'name', 'email'] },
                { model: User, as: 'distributionBuyer', attributes: ['id', 'name', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: distributions });
    } catch (error) {
        next(error);
    }
};

// Get activity logs
const getActivityLogs = async (req, res, next) => {
    try {
        const logs = await ActivityLog.findAll({
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] }],
            order: [['created_at', 'DESC']],
            limit: 100
        });
        res.json({ success: true, data: logs });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardStats, getUsers, createUser, updateUserStatus, getAllBatches, getAllDistributions, getActivityLogs };
