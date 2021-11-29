const { DataTypes } = require('sequelize');
const db = require('../../database/connection');
const ticketSubCategory = require('./ticketSubCategory');

const TicketCategory = db.define('TicketCategory', {
    ticketCategoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

TicketCategory.hasMany(ticketSubCategory);
module.exports = TicketCategory;