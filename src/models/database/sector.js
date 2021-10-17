const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const Sector = db.define('Sectors', {
    sectorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = Sector;