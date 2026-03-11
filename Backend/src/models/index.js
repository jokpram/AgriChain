const sequelize = require('../config/database');
const User = require('./user');
const Farm = require('./farm');
const Commodity = require('./commodity');
const Batch = require('./batch');
const CultivationLog = require('./cultivationLog');
const Distribution = require('./distribution');
const Order = require('./order');
const ActivityLog = require('./activityLog');
const Product = require('./product');
const Withdrawal = require('./withdrawal');

// ===== Associations =====

// User <-> Farm
User.hasMany(Farm, { foreignKey: 'farmer_id', as: 'farms' });
Farm.belongsTo(User, { foreignKey: 'farmer_id', as: 'farmer' });

// User <-> Batch
User.hasMany(Batch, { foreignKey: 'farmer_id', as: 'batches' });
Batch.belongsTo(User, { foreignKey: 'farmer_id', as: 'farmer' });

// Commodity <-> Batch
Commodity.hasMany(Batch, { foreignKey: 'commodity_id', as: 'batches' });
Batch.belongsTo(Commodity, { foreignKey: 'commodity_id', as: 'commodity' });

// Farm <-> Batch
Farm.hasMany(Batch, { foreignKey: 'farm_id', as: 'batches' });
Batch.belongsTo(Farm, { foreignKey: 'farm_id', as: 'farm' });

// Farm <-> CultivationLog
Farm.hasMany(CultivationLog, { foreignKey: 'farm_id', as: 'cultivationLogs' });
CultivationLog.belongsTo(Farm, { foreignKey: 'farm_id', as: 'farm' });

// Batch <-> Distribution
Batch.hasMany(Distribution, { foreignKey: 'batch_id', as: 'distributions' });
Distribution.belongsTo(Batch, { foreignKey: 'batch_id', as: 'batch' });

// User (distributor) <-> Distribution
User.hasMany(Distribution, { foreignKey: 'distributor_id', as: 'distributorDistributions' });
Distribution.belongsTo(User, { foreignKey: 'distributor_id', as: 'distributor' });

// User (buyer) <-> Distribution
User.hasMany(Distribution, { foreignKey: 'buyer_id', as: 'buyerDistributions' });
Distribution.belongsTo(User, { foreignKey: 'buyer_id', as: 'distributionBuyer' });

// Batch <-> Order
Batch.hasMany(Order, { foreignKey: 'batch_id', as: 'orders' });
Order.belongsTo(Batch, { foreignKey: 'batch_id', as: 'batch' });

// User (buyer) <-> Order
User.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

// User <-> ActivityLog
User.hasMany(ActivityLog, { foreignKey: 'user_id', as: 'activityLogs' });
ActivityLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User <-> Product
User.hasMany(Product, { foreignKey: 'farmer_id', as: 'products' });
Product.belongsTo(User, { foreignKey: 'farmer_id', as: 'farmer' });

// Batch <-> Product
Batch.hasMany(Product, { foreignKey: 'batch_id', as: 'products' });
Product.belongsTo(Batch, { foreignKey: 'batch_id', as: 'batch' });

// Product <-> Order
Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// User <-> Withdrawal
User.hasMany(Withdrawal, { foreignKey: 'farmer_id', as: 'withdrawals' });
Withdrawal.belongsTo(User, { foreignKey: 'farmer_id', as: 'farmer' });

module.exports = {
    sequelize,
    User,
    Farm,
    Commodity,
    Batch,
    CultivationLog,
    Distribution,
    Order,
    ActivityLog,
    Product,
    Withdrawal
};
