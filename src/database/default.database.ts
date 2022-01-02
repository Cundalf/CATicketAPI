// Database Connection
import { createConnection } from 'typeorm';
import path from 'path';

export default async function connectDatabase(): Promise<void> {
    
    await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
            path.resolve(__dirname, '../models/entities/*.entity.js')
        ],
        synchronize: true,
    }).then(connection => {
        console.log(`Connected to ${connection.driver.database}`);
    }).catch(
        error => { 
            throw new Error(`Database Error: ${error.code} \n (${error.sqlMessage})`);
        }
    );
}