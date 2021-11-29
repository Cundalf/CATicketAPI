import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const Order = db.define('Orders', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    solicitationId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    state: DataTypes.BOOLEAN
});

export default Order;