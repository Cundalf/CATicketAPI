const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketCategory = db.define('TicketCategory', {
    ticketCategoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = TicketCategory;