const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: process.env.TOKENEXPIRATION || '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Invalid token');
            } else {
                resolve(token);
            }
        });

    });
};

module.exports = {
    generateJWT
};

