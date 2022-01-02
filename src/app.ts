
import 'reflect-metadata';
import dotenv from 'dotenv';
import Server from './models/server.model';
import sourceMapSupport from 'source-map-support';
import path from 'path';
import connectDatabase from './database/default.database';

(async () => {
    // Cargo la configuracion del environment
    dotenv.config({ path: path.join(__dirname, '../.env') });
    // Habilito el mapeo de TS
    sourceMapSupport.install()
    
    // Por defecto forzamos el env development.
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    await connectDatabase();
    
    // Cargo el server
    const server: Server = Server.loadServer();
    server.listen();    
})();