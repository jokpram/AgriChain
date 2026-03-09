const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CultivationLog = sequelize.define('CultivationLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'farms', key: 'id' }
    },
    activity_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    activity_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'cultivation_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = CultivationLog;
