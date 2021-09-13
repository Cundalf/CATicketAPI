const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Sector = db.define('Sector', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
});

module.exports = Sector;