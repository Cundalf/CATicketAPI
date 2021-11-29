const bcryptjs = require('bcryptjs');
const User = require('../models/database/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                error: 1,
                msg: 'User or password incorrect'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                error: 2,
                msg: 'User disabled'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                error: 1,
                msg: 'User or password incorrect'
            });
        }
        
        const token = await generateJWT(user.id);

        res.json({
            error: 0,
            data: {
                user,
                token
            }
        });

    } catch (error) {
        res.status(500).json({
            error: 3,
            msg: 'Service not available'
        });
    }
};

module.exports = {
    login
};
