const bcryptjs = require('bcryptjs');
const User = require('../models/database/user');
const { generateJWT } = require('../helpers/jwt');
const _ = require('underscore');

const getUsers = async (req, res) => {
    const users = await User.findAll();

    res.json({
        error: 0,
        data: users
    });
};

const getUser = async (req, res) => {

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.json({
            error: 0,
            data: user
        });
    } else {
        res.status(404).json({
            error: 1,
            msg: `There is no user with the ID: ${id}`
        });
    }
};

const postUser = async (req, res) => {

    const { body } = req;
    
    console.log(body);
    
    try {

        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (emailExists) {
            return res.status(400).json({
                error: 1,
                msg: 'Email already registered: ' + body.email
            });
        }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(body.password, salt);
        
        if(_.isUndefined(body.role))
            body.role = 0;
        
        const newUser = new User(body);
        await newUser.save();

        res.json({
            error: 0,
            data: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 1,
            msg: 'Service not available'
        });
    }
};

const putUser = async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                error: 1,
                msg: 'There is no user with the ID ' + id
            });
        }
        
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(body.password, salt);
        
        if (!_.isUndefined(body.id))
            delete body.id;

        await user.update(body);

        res.json({
            error: 0,
            data: user
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: 1,
            msg: 'Service not available'
        });
    }
};

const deleteUser = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            error: 1,
            msg: 'There is no user with the ID ' + id
        });
    }

    await user.update({ state: 0 });
    res.json({
        error: 0,
        msg: "OK"
    });
};

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
    login,
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
};
