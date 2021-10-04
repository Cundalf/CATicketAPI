const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const Employee = db.define('Employees', {
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employeeRecord: DataTypes.INTEGER,
    employeeDeviceType: DataTypes.INTEGER,
    employeeFirstName: DataTypes.STRING(90),
    employeeLastName: DataTypes.STRING(90),
    employeeHeadquarter: DataTypes.INTEGER,
    employeeSector: DataTypes.INTEGER,
    employeePhone: DataTypes.STRING(90),
    employeeEmail: DataTypes.STRING(90),
    state: DataTypes.BOOLEAN
});

module.exports = Employee;