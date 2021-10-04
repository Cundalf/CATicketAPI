const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

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

module.exports = Order;