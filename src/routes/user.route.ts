import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validator.middleware';
import UserController from '../controllers/user.controller';
import { validateJWT, validateAdminJWT } from '../middlewares/auth.middleware';
import { validateUserRole } from '../middlewares/user.middleware';

const router = Router();
const userController = new UserController();

router.get('/', validateJWT, userController.getAll);
router.get('/:id', validateJWT, userController.getOne);
router.post('/', [
    validateAdminJWT,
    check('userFirstName', 'userFirstName is required').not().isEmpty(),
    check('userLastName', 'userLastName is required').not().isEmpty(),
    check('userEmail', 'userEmail is required').not().isEmpty(),
    check('userEmail', 'userEmail must be valid').isEmail(),
    check('userPassword', 'userPassword is required').not().isEmpty(),
    check('userPassword', 'userPassword too short').isLength({ min: 8 }),
    check('userState', 'userState invalid').optional().isBoolean(),
    validateUserRole,
    validateFields
], userController.create);
router.put('/:id', [
    validateAdminJWT,
    check('userFirstName', 'userFirstName is required').optional().not().isEmpty(),
    check('userLastName', 'userLastName is required').optional().not().isEmpty(),
    check('userEmail', 'userEmail is required').optional().not().isEmpty(),
    check('userEmail', 'userEmail must be valid').optional().isEmail(),
    check('userPassword', 'userPassword is required').optional().not().isEmpty(),
    check('userPassword', 'userPassword too short').optional().isLength({ min: 8 }),
    check('userState', 'userState invalid').optional().isBoolean(),
    validateUserRole,
    validateFields
], validateAdminJWT, userController.update);
router.delete('/:id', validateAdminJWT, userController.delete);

export default router;