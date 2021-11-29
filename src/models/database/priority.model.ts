import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const Priority = db.define('Priorities', {
    priorityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

export default Priority;