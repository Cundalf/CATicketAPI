import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const Headquarter = db.define('Headquarters', {
    headquarterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    ipRange: DataTypes.STRING(8),
    state: DataTypes.BOOLEAN
});

export default Headquarter;