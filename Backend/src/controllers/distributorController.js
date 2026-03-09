const { Distribution, Batch, Commodity, User, ActivityLog } = require('../models');
const DistributionService = require('../services/distributionService');

// Get available batches for pickup
const getAvailableBatches = async (req, res, next) => {
    try {
        const batches = await Batch.findAll({
            where: { status: 'available' },
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

// Pickup a batch
const pickupBatch = async (req, res, next) => {
    try {
        const { batch_id } = req.body;
        if (!batch_id) {
            return res.status(400).json({ success: false, message: 'batch_id is required' });
        }

        const distribution = await DistributionService.pickupBatch(batch_id, req.user.id);

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'BATCH_PICKED',
            description: `Distributor picked up batch #${batch_id}`
        });

        res.status(201).json({ success: true, message: 'Batch picked up successfully', data: distribution });
    } catch (error) {
        next(error);
    }
};

// Update distribution status
const updateStatus = async (req, res, next) => {
    try {
        const { distribution_id, status, buyer_id } = req.body;
        if (!distribution_id || !status) {
            return res.status(400).json({ success: false, message: 'distribution_id and status are required' });
        }

        if (!['pending', 'picked', 'in_transit', 'delivered'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const distribution = await DistributionService.updateStatus(distribution_id, req.user.id, status, buyer_id);

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'DISTRIBUTION_STATUS_UPDATE',
            description: `Distribution #${distribution_id} status updated to ${status}`
        });

        res.json({ success: true, message: 'Status updated successfully', data: distribution });
    } catch (error) {
        next(error);
    }
};

// Get distributor's distributions
const getDistributions = async (req, res, next) => {
    try {
        const distributions = await DistributionService.getDistributionsByDistributor(req.user.id);
        res.json({ success: true, data: distributions });
    } catch (error) {
        next(error);
    }
};

// Get distributor dashboard
const getDashboard = async (req, res, next) => {
    try {
        const totalDistributions = await Distribution.count({ where: { distributor_id: req.user.id } });
        const pendingDistributions = await Distribution.count({ where: { distributor_id: req.user.id, status: 'pending' } });
        const pickedDistributions = await Distribution.count({ where: { distributor_id: req.user.id, status: 'picked' } });
        const inTransitDistributions = await Distribution.count({ where: { distributor_id: req.user.id, status: 'in_transit' } });
        const deliveredDistributions = await Distribution.count({ where: { distributor_id: req.user.id, status: 'delivered' } });

        const availableBatches = await Batch.count({ where: { status: 'available' } });

        res.json({
            success: true,
            data: {
                totalDistributions,
                pendingDistributions,
                pickedDistributions,
                inTransitDistributions,
                deliveredDistributions,
                availableBatches
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAvailableBatches, pickupBatch, updateStatus, getDistributions, getDashboard };
