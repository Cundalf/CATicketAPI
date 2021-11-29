const bcryptjs = require('bcryptjs');
const employeeDevice = require('../../models/database/employeeDevice');
const _ = require('underscore');

const getAllEmployeeDevices = async (req, res) => {
    const empDevices = await employeeDevice.findAll();

    res.json({
        error: 0,
        data: empDevices
    });
};

const getEmployeeDevice = async (req, res) => {

    const { id } = req.params;
    const empDevice = await employeeDevice.findByPk(id);

    if (empDevice) {
        res.json({
            error: 0,
            data: empDevice
        });
    } else {
        res.status(404).json({
            error: 1,
            msg: `There is no employee device with the ID: ${id}`
        });
    }
};

const createEmployeeDevice = async (req, res) => {

    const { body } = req;

    try {

        const newEmpDevice = new employeeDevice(body);
        await newEmpDevice.save();

        res.json({
            error: 0,
            data: newEmpDevice
        });

    } catch (error) {
        res.status(500).json({
            error: 1,
            msg: 'Service not available'
        });
    }
};

const updateEmployeeDevice = async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const empDevice = await employeeDevice.findByPk(id);
        if (!empDevice) {
            return res.status(404).json({
                error: 1,
                msg: 'There is no employee device with the ID ' + id
            });
        }

        await empDevice.update(body);

        res.json({
            error: 0,
            data: empDevice
        });

    } catch (error) {
        res.status(500).json({
            error: 1,
            msg: 'Service not available'
        });
    }
};

const deleteEmployeeDevice = async (req, res) => {

    const { id } = req.params;

    const empDevice = await employeeDevice.findByPk(id);
    if (!empDevice) {
        return res.status(404).json({
            error: 1,
            msg: 'There is no employee device with the ID ' + id
        });
    }

    await empDevice.update({ state: 0 });
    res.json({
        error: 0,
        msg: "OK"
    });
};

module.exports = {
    getAllEmployeeDevices,
    getEmployeeDevice,
    createEmployeeDevice,
    updateEmployeeDevice,
    deleteEmployeeDevice
};
