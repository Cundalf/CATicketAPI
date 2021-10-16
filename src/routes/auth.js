const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const { validateJWT, validateAdminJWT } = require('../middlewares/jwt');
const { login, getUser, getUsers, postUser, putUser, deleteUser } = require('../controllers/auth');
const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.get('/', [validateAdminJWT], getUsers);

router.get('/:id', [validateJWT], getUser);

router.post('/', [validateAdminJWT,
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('state', 'state is required').isBoolean(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password too weak').isLength({ min: 8 })
], postUser);

router.put('/:id', [validateAdminJWT,
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('state', 'state is required').isBoolean(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password too weak').isLength({ min: 8 })
], putUser);

router.delete('/:id', [validateAdminJWT], deleteUser);

module.exports = router;