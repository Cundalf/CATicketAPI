import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';
import ticketSubCategory from './ticketSubCategory.model';

const TicketCategory = db.define('TicketCategory', {
    ticketCategoryId: {
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

TicketCategory.hasMany(ticketSubCategory);

export default TicketCategory;