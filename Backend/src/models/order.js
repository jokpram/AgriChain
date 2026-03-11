const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'batches', key: 'id' }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' }
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    distributor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
    },
    delivery_fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'completed'),
        defaultValue: 'pending'
    },
    payment_status: {
        type: DataTypes.ENUM('unpaid', 'paid', 'failed'),
        defaultValue: 'unpaid'
    },
    payment_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    midtrans_token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Order;
