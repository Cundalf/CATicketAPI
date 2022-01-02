import jwt from 'jsonwebtoken';
import { ISession } from '../interfaces/auth.interface';

export default (payload: ISession) => {

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SEED_TOKEN || 'T0k3nD3f49lt', {
            expiresIn: process.env.TOKENEXPIRATION || '4h'
        }, (err, token: (string | undefined)): void => {
            if (err) {
                reject('Invalid token');
            } else {
                resolve(token);
            }
        });

    });
};