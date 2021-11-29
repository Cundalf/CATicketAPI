
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateAdminJWT } = require('../middlewares/jwt');
const { validateFields } = require('../middlewares/validate');
const { getUser, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router();

router.get('/', [validateAdminJWT], getAllUsers);

router.get('/:id', [validateJWT], getUser);

router.post('/', [validateAdminJWT,
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('state', 'state is required').isBoolean(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password too weak').isLength({ min: 8 }),
    validateFields
], createUser);

router.put('/:id', [validateAdminJWT,
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('state', 'state is required').isBoolean(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password too weak').isLength({ min: 8 }),
    validateFields
], updateUser);

router.delete('/:id', [validateAdminJWT], deleteUser);

module.exports = router;