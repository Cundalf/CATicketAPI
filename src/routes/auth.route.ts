import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validator.middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();

const authController = new AuthController();

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], authController.auth);

export default router;