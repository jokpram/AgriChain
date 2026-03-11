const { Batch, Commodity } = require('../models');
const { generateBatchCode } = require('../utils/batchGenerator');

class BatchService {
    static async createBatch(farmerId, commodityId, farmId, harvestDate, quantity, unit = 'kg', seedOrigin, plantingDate, pricePerUnit) {
        const commodity = await Commodity.findByPk(commodityId);
        if (!commodity) {
            throw Object.assign(new Error('Commodity not found'), { statusCode: 404 });
        }

        // Generate unique batch code with retry
        let batchCode;
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 10) {
            batchCode = generateBatchCode(commodity.name, harvestDate);
            const existing = await Batch.findOne({ where: { batch_code: batchCode } });
            if (!existing) isUnique = true;
            attempts++;
        }

        if (!isUnique) {
            throw new Error('Failed to generate unique batch code');
        }

        const batch = await Batch.create({
            batch_code: batchCode,
            farmer_id: farmerId,
            commodity_id: commodityId,
            farm_id: farmId,
            harvest_date: harvestDate,
            quantity,
            unit,
            seed_origin: seedOrigin,
            planting_date: plantingDate,
            price_per_unit: pricePerUnit,
            status: 'available'
        });

        return batch;
    }

    static async getBatchesByFarmer(farmerId) {
        return Batch.findAll({
            where: { farmer_id: farmerId },
            include: [
                { model: Commodity, as: 'commodity' },
                { model: require('../models/farm'), as: 'farm' }
            ],
            order: [['created_at', 'DESC']]
        });
    }

    static async getAvailableBatches() {
        return Batch.findAll({
            where: { status: 'available' },
            include: [
                { model: Commodity, as: 'commodity' },
                { model: require('../models/user'), as: 'farmer', attributes: ['id', 'name', 'email'] },
                { model: require('../models/farm'), as: 'farm' }
            ],
            order: [['created_at', 'DESC']]
        });
    }
}

module.exports = BatchService;
