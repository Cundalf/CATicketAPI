const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketSubCategory = db.define('TicketSubCategories', {
    ticketSubCategoryId: {
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

module.exports = TicketSubCategory;