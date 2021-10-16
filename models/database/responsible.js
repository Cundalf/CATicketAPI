const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const ticketModel = require('./ticket');
const userModel = require('./user');

const TicketResponsible = db.define('TicketResponsibles', {
    responsibleUser: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    responsibleTicket: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
});

TicketResponsible.belongsTo(userModel, { foreignKey: 'responsibleUser' });
TicketResponsible.belongsTo(ticketModel, { foreignKey: 'responsibleTicket' });

module.exports = TicketResponsible;