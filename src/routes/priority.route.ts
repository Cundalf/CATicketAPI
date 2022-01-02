import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validator.middleware';
import { validateJWT, validateAdminJWT } from '../middlewares/auth.middleware';
import { validateUserRole } from '../middlewares/user.middleware';
import PriorityController from '../controllers/priority.controller';

const router = Router();
const priorityController: PriorityController = new PriorityController();

router.get('/', validateJWT, priorityController.getAll);

router.get('/:id', validateJWT, priorityController.getOne);

router.post('/', [
    validateAdminJWT,
    check('description', 'description is required').not().isEmpty(),
    check('state', 'state invalid').optional().isBoolean(),
    validateUserRole,
    validateFields
], priorityController.create);

router.put('/:id', [
    validateAdminJWT,
    check('description', 'description is required').not().isEmpty(),
    check('state', 'state invalid').optional().isBoolean(),
    validateUserRole,
    validateFields
], validateAdminJWT, priorityController.update);

router.delete('/:id', validateAdminJWT, priorityController.delete);

export default router;