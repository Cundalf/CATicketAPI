const jwt = require('jsonwebtoken');
const User = require('../models/database/user');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 1,
            msg: 'Token not received'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        
        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            error: 1,
            msg: 'Invalid token'
        });
    }

};

const validateAdminJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 1,
            msg: 'Token not received'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        
        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }

        if (!user.state) {
            return res.status(403).json({
                error: 1,
                msg: 'Unauthorized user'
            });
        }

        if (user.role != process.env.ADMINID) {
            return res.status(403).json({
                error: 1,
                msg: 'Unauthorized user'
            });
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            error: 1,
            msg: 'Invalid token'
        });
    }

};

module.exports = {
    validateJWT,
    validateAdminJWT
};
