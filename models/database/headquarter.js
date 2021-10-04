const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const Headquarter = db.define('Headquarters', {
    headquarterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    ipRange: DataTypes.STRING(8),
    state: DataTypes.BOOLEAN
});

module.exports = Headquarter;