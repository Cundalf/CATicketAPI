const { DataTypes } = require('sequelize');
const db = require('../database/connection');
const TicketSubCategory = require('./ticketSubCategory');

const TicketCategory = db.define('TicketCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
});

module.exports = TicketCategory;