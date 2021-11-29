import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

import ticketModel from './ticket.model';
import userModel from './user.model';

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

export default TicketResponsible;