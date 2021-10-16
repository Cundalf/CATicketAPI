const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketTask = db.define('TicketTasks', {
    ticketTaskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticketSubCategory: DataTypes.INTEGER,
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = TicketTask;