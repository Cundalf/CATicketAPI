import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validator.middleware';
import { validateJWT, validateAdminJWT } from '../middlewares/auth.middleware';
import { validateUserRole } from '../middlewares/user.middleware';
import HeadquarterController from '../controllers/headquarter.controller';

const router = Router();
const headquarterController: HeadquarterController = new HeadquarterController();

router.get('/', validateJWT, headquarterController.getAll);

router.get('/:id', validateJWT, headquarterController.getOne);

router.post('/', [
    validateAdminJWT,
    check('description', 'description is required').not().isEmpty(),
    check('state', 'state invalid').optional().isBoolean(),
    check('ipRange', 'ipRange is required').not().isEmpty(),
    validateUserRole,
    validateFields
], headquarterController.create);

router.put('/:id', [
    validateAdminJWT,
    check('description', 'description is required').not().isEmpty(),
    check('state', 'state invalid').optional().isBoolean(),
    check('ipRange', 'ipRange is required').not().isEmpty(),
    validateUserRole,
    validateFields
], validateAdminJWT, headquarterController.update);

router.delete('/:id', validateAdminJWT, headquarterController.delete);

export default router;