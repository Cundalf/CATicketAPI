import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

import headquarterModel from './headquarter.model';
import priorityModel from './priority.model';
import employeeModel from './employee.model';
import userModel from './user.model';
import ticketCategoryModel from './ticketCategory.model';
import ticketSubCategoryModel from './ticketSubCategory.model';
import ticketTaskModel from './ticketTask.model';
import sectorModel from './sector.model';
import ticketStateModel from './ticketState.model';
import orderModel from './order.model';
import ticketUpdateModel from './ticketUpdates.model';

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
Ticket.hasMany(ticketUpdateModel);

export default Ticket;