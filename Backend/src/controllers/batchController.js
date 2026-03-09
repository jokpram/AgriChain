const { Batch, Commodity, User, Distribution, Order } = require('../models');

// Get batch by code or ID (public trace)
const getBatchByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const batch = await Batch.findOne({
            where: { batch_code: code },
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

// Get all commodities
const getCommodities = async (req, res, next) => {
    try {
        const commodities = await Commodity.findAll({ order: [['name', 'ASC']] });
        res.json({ success: true, data: commodities });
    } catch (error) {
        next(error);
    }
};

// Create commodity (admin/farmer)
const createCommodity = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: 'Commodity name is required' });
        }

        const commodity = await Commodity.create({ name, description });
        res.status(201).json({ success: true, message: 'Commodity created', data: commodity });
    } catch (error) {
        next(error);
    }
};

module.exports = { getBatchByCode, getCommodities, createCommodity };
