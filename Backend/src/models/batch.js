const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Batch = sequelize.define('Batch', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    batch_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    farmer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    commodity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'commodities', key: 'id' }
    },
    farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'farms', key: 'id' }
    },
    harvest_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING,
        defaultValue: 'kg'
    },
    seed_origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planting_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    price_per_unit: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'distributed', 'sold'),
        defaultValue: 'available'
    }
}, {
    tableName: 'batches',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Batch;
