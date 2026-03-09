const { Distribution, Batch, User } = require('../models');

class DistributionService {
    static async pickupBatch(batchId, distributorId) {
        const batch = await Batch.findByPk(batchId);
        if (!batch) {
            throw Object.assign(new Error('Batch not found'), { statusCode: 404 });
        }
        if (batch.status !== 'available') {
            throw Object.assign(new Error('Batch is not available for pickup'), { statusCode: 400 });
        }

        const distribution = await Distribution.create({
            batch_id: batchId,
            distributor_id: distributorId,
            status: 'picked',
            pickup_date: new Date()
        });

        await batch.update({ status: 'distributed' });

        return distribution;
    }

    static async updateStatus(distributionId, distributorId, status, buyerId = null) {
        const distribution = await Distribution.findOne({
            where: { id: distributionId, distributor_id: distributorId }
        });

        if (!distribution) {
            throw Object.assign(new Error('Distribution not found'), { statusCode: 404 });
        }

        const updateData = { status };
        if (status === 'delivered') {
            updateData.delivery_date = new Date();
        }
        if (buyerId) {
            updateData.buyer_id = buyerId;
        }

        await distribution.update(updateData);

        if (status === 'delivered') {
            await Batch.update({ status: 'sold' }, { where: { id: distribution.batch_id } });
        }

        return distribution;
    }

    static async getDistributionsByDistributor(distributorId) {
        return Distribution.findAll({
            where: { distributor_id: distributorId },
            include: [
                {
                    model: Batch, as: 'batch',
                    include: [{ model: require('../models/commodity'), as: 'commodity' }]
                },
                { model: User, as: 'distributionBuyer', attributes: ['id', 'name', 'email'] }
            ],
            order: [['created_at', 'DESC']]
        });
    }
}

module.exports = DistributionService;
