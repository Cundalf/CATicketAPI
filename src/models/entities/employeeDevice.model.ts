// import { DataTypes } from 'sequelize';
// import db from '../../database/connection.db';
// import employeeDeviceTypeModel from './employeeDeviceType.model';

// const EmployeeDevice = db.define('EmployeeDevices', {
//     employeeDeviceId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     employeeDeviceName: DataTypes.STRING(190),
//     employeeDeviceType: DataTypes.INTEGER,
//     deviceSerialNumber: DataTypes.STRING(190),
//     deviceIp: DataTypes.STRING(190),
//     hostname: DataTypes.STRING(190),
//     state: DataTypes.BOOLEAN
// });

// EmployeeDevice.belongsTo(employeeDeviceTypeModel, { foreignKey: 'employeeDeviceType' });

// export default EmployeeDevice;