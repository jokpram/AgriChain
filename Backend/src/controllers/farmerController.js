const { Farm, CultivationLog, Batch, Commodity, ActivityLog, Distribution, User } = require('../models');
const BatchService = require('../services/batchService');

// Create farm
const createFarm = async (req, res, next) => {
    try {
        const { farm_name, location, size } = req.body;
        if (!farm_name || !location || !size) {
            return res.status(400).json({ success: false, message: 'farm_name, location, and size are required' });
        }

        const farm = await Farm.create({
            farmer_id: req.user.id,
            farm_name,
            location,
            size
        });

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'FARM_CREATED',
            description: `Farm "${farm_name}" created at ${location}`
        });

        res.status(201).json({ success: true, message: 'Farm created successfully', data: farm });
    } catch (error) {
        next(error);
    }
};

// Get farmer's farms
const getFarms = async (req, res, next) => {
    try {
        const farms = await Farm.findAll({
            where: { farmer_id: req.user.id },
            include: [{ model: CultivationLog, as: 'cultivationLogs' }],
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: farms });
    } catch (error) {
        next(error);
    }
};

// Create cultivation log
const createCultivationLog = async (req, res, next) => {
    try {
        const { farm_id, activity_type, description, activity_date } = req.body;
        if (!farm_id || !activity_type || !activity_date) {
            return res.status(400).json({ success: false, message: 'farm_id, activity_type, and activity_date are required' });
        }

        // Verify farm belongs to farmer
        const farm = await Farm.findOne({ where: { id: farm_id, farmer_id: req.user.id } });
        if (!farm) {
            return res.status(404).json({ success: false, message: 'Farm not found' });
        }

        const log = await CultivationLog.create({ farm_id, activity_type, description, activity_date });
        res.status(201).json({ success: true, message: 'Cultivation log created', data: log });
    } catch (error) {
        next(error);
    }
};

// Get cultivation logs
const getCultivationLogs = async (req, res, next) => {
    try {
        const farms = await Farm.findAll({ where: { farmer_id: req.user.id }, attributes: ['id'] });
        const farmIds = farms.map(f => f.id);

        const logs = await CultivationLog.findAll({
            where: { farm_id: farmIds },
            include: [{ model: Farm, as: 'farm' }],
            order: [['activity_date', 'DESC']]
        });
        res.json({ success: true, data: logs });
    } catch (error) {
        next(error);
    }
};

// Create batch (harvest)
const createBatch = async (req, res, next) => {
    try {
        const { commodity_id, harvest_date, quantity, unit } = req.body;
        if (!commodity_id || !harvest_date || !quantity) {
            return res.status(400).json({ success: false, message: 'commodity_id, harvest_date, and quantity are required' });
        }

        const batch = await BatchService.createBatch(req.user.id, commodity_id, harvest_date, quantity, unit);

        await ActivityLog.create({
            user_id: req.user.id,
            action: 'BATCH_CREATED',
            description: `Batch ${batch.batch_code} created with ${quantity} ${unit || 'kg'}`
        });

        // Reload with commodity
        const fullBatch = await Batch.findByPk(batch.id, {
            include: [{ model: Commodity, as: 'commodity' }]
        });

        res.status(201).json({ success: true, message: 'Batch created successfully', data: fullBatch });
    } catch (error) {
        next(error);
    }
};

// Get farmer's batches
const getBatches = async (req, res, next) => {
    try {
        const batches = await BatchService.getBatchesByFarmer(req.user.id);
        res.json({ success: true, data: batches });
    } catch (error) {
        next(error);
    }
};

// Get farmer dashboard stats
const getDashboard = async (req, res, next) => {
    try {
        const totalFarms = await Farm.count({ where: { farmer_id: req.user.id } });
        const totalBatches = await Batch.count({ where: { farmer_id: req.user.id } });
        const availableBatches = await Batch.count({ where: { farmer_id: req.user.id, status: 'available' } });
        const distributedBatches = await Batch.count({ where: { farmer_id: req.user.id, status: 'distributed' } });
        const soldBatches = await Batch.count({ where: { farmer_id: req.user.id, status: 'sold' } });

        const recentBatches = await Batch.findAll({
            where: { farmer_id: req.user.id },
            include: [{ model: Commodity, as: 'commodity' }],
            order: [['created_at', 'DESC']],
            limit: 5
        });

        res.json({
            success: true,
            data: {
                totalFarms,
                totalBatches,
                availableBatches,
                distributedBatches,
                soldBatches,
                recentBatches
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createFarm, getFarms, createCultivationLog, getCultivationLogs, createBatch, getBatches, getDashboard };
