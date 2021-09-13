const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const TicketSubCategory = db.define('TicketSubCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
});

module.exports = TicketSubCategory;