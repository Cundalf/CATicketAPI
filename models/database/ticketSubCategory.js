const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketSubCategory = db.define('TicketSubCategories', {
    ticketSubCategoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = TicketSubCategory;