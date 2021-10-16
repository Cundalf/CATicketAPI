const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const headquarterModel = require('./headquarter');
const priorityModel = require('./priority');
const employeeModel = require('./employee');
const userModel = require('./user');
const ticketCategoryModel = require('./ticketCategory');
const ticketSubCategoryModel = require('./ticketSubCategory');
const ticketTaskModel = require('./ticketTask');
const sectorModel = require('./sector');
const ticketStateModel = require('./ticketState');
const orderModel = require('./order');

const Ticket = db.define('Tickets', {
    ticketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticketDate: DataTypes.DATEONLY,
    ticketTime: DataTypes.TIME,
    ticketHeadquarter: DataTypes.INTEGER,
    ticketPriority: DataTypes.INTEGER,
    ticketEmployee: DataTypes.INTEGER,
    ticketUserCreator: DataTypes.INTEGER,
    ticketCategory: DataTypes.INTEGER,
    ticketSubCategory: DataTypes.INTEGER,
    ticketTask: DataTypes.INTEGER,
    ticketSector: DataTypes.INTEGER,
    ticketState: DataTypes.INTEGER,
    ticketOrder: DataTypes.INTEGER,
    ticketDescription: DataTypes.TEXT,
    contactPhone: DataTypes.STRING(45),
    contactComputer: DataTypes.STRING(45),
    contactEmail: DataTypes.STRING(90)
});

Ticket.belongsTo(headquarterModel, { foreignKey: 'ticketHeadquarter' });
Ticket.belongsTo(priorityModel, { foreignKey: 'ticketPriority' });
Ticket.belongsTo(employeeModel, { foreignKey: 'ticketEmployee' });
Ticket.belongsTo(userModel, { foreignKey: 'ticketUserCreator' });
Ticket.belongsTo(ticketCategoryModel, { foreignKey: 'ticketCategory' });
Ticket.belongsTo(ticketSubCategoryModel, { foreignKey: 'ticketSubCategory' });
Ticket.belongsTo(ticketTaskModel, { foreignKey: 'ticketTask' });
Ticket.belongsTo(sectorModel, { foreignKey: 'ticketSector' });
Ticket.belongsTo(ticketStateModel, { foreignKey: 'ticketState' });
Ticket.belongsTo(orderModel, { foreignKey: 'ticketOrder' });

module.exports = Ticket;