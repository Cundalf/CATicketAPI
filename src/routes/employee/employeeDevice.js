
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateAdminJWT } = require('../../middlewares/jwt');
const { validateFields } = require('../../middlewares/validate');
const { getAllEmployeeDevices, getEmployeeDevice, createEmployeeDevice, updateEmployeeDevice, deleteEmployeeDevice } = require('../../controllers/employee/employeeDevice');

const router = Router();

router.get('/', [validateAdminJWT], getAllEmployeeDevices);

router.get('/:id', [validateJWT], getEmployeeDevice);

router.post('/', [validateAdminJWT,
    check('employeeDeviceName', 'employeeDeviceName is required').not().isEmpty(),
    check('employeeDeviceType', 'employeeDeviceType is required').not().isEmpty(),
    check('employeeSector', 'employeeSector is required').isNumeric().not().isEmpty(),
    check('deviceSerialNumber', 'deviceSerialNumber is required').not().isEmpty(),
    check('deviceIp', 'deviceIp is required').not().isEmpty(),
    check('hostname', 'hostname is required').not().isEmpty(),
    check('state', 'state is required').isBoolean(),
    validateFields
], createEmployeeDevice);

router.put('/:id', [validateAdminJWT,
    check('employeeDeviceName', 'employeeDeviceName is required').not().isEmpty(),
    check('employeeDeviceType', 'employeeDeviceType is required').not().isEmpty(),
    check('employeeSector', 'employeeSector is required').isNumeric().not().isEmpty(),
    check('deviceSerialNumber', 'deviceSerialNumber is required').not().isEmpty(),
    check('deviceIp', 'deviceIp is required').not().isEmpty(),
    check('hostname', 'hostname is required').not().isEmpty(),
    check('state', 'state is required').isBoolean(),
    validateFields
], updateEmployeeDevice);

router.delete('/:id', [validateAdminJWT], deleteEmployeeDevice);

module.exports = router;
