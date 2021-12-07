import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validator.middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();

/*
, [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
]
*/

const authController = new AuthController();

router.post('/', authController.auth);

export default router;