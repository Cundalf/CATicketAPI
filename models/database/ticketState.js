const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketState = db.define('TicketStates', {
    ticketStateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = TicketState;