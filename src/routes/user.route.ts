import { Router } from 'express';
//import { check } from 'express-validator';

//import validateFields from '../middlewares/validator.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

/*
, [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
]
*/

const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;