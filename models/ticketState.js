const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const TicketState = db.define('TicketState', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
});

module.exports = TicketState;