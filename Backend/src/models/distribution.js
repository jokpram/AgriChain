const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Distribution = sequelize.define('Distribution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'batches', key: 'id' }
    },
    distributor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
    },
    status: {
        type: DataTypes.ENUM('pending', 'picked', 'in_transit', 'delivered'),
        defaultValue: 'pending'
    },
    pickup_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    delivery_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'distributions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Distribution;
