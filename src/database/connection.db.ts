import { Sequelize } from 'Sequelize';
import logger from '../libs/logger.lib';

export default new Sequelize(
    process.env.DB_NAME || 'caticket',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: msg => logger.debug(msg),
    }
);