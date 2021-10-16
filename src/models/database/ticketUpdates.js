const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const TicketUpdate = db.define('TicketUpdates', {
    ticketUpdateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticketUpdate: DataTypes.TEXT,
    state: DataTypes.BOOLEAN
});

module.exports = TicketUpdate;