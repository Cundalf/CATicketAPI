import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const EmployeeDeviceType = db.define('EmployeeDeviceTypes', {
    employeeDeviceTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

export default EmployeeDeviceType;