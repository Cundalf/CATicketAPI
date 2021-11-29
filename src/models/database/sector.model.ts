import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const Sector = db.define('Sectors', {
    sectorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

export default Sector;