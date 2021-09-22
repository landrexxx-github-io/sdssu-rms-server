const mongoose = require('mongoose');
const DepartmentSchema = require('../models/department.js');

exports.getDepartment = async (req, res) => {
    try {
        const results = await DepartmentSchema.find();

        if(results) {
            res.status(200).send({
                success: true,
                results
            })
        } else {
            res.status(404).send({
                success: false,
                results,
            })
        }
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

exports.createDepartment = async (req, res) => {
    let insertDept = new DepartmentSchema(req.body);

    try {
        const results = await insertDept.save();

        if(results) {
            res.status(201).send({
                success: true,
                results
            });
        } else {
            res.status(500).send({
                success: false,
                results
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.updateDepartment = async (req, res) => {
    const { department_id } = req.body;
    const department = req.body;

    if(!mongoose.Types.ObjectId.isValid(department_id)) return res.status(404).send('Invalid id.');

    const updated = await DepartmentSchema.findByIdAndUpdate(department_id, department, {new: true});

    res.json(updated);
}

exports.deleteDepartment = async (req, res) => {
    const { department_id } = req.query;

    if(!mongoose.Types.ObjectId.isValid(department_id)) return res.status(404).send('Invalid id.');

    await DepartmentSchema.findByIdAndRemove(department_id);

    res.json({ success: true });
}