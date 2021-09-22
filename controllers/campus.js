const mongoose = require('mongoose');
const CampusSchema = require('../models/campus.js');

exports.getCampus = async (req, res) => {
    try {
        const results = await CampusSchema.find();

        if(results) {
            res.status(200).send({
                success: true,
                results
            });
        } else {
            res.status(404).send({
                success: false,
                results
            })
        }
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

exports.createCampus = async (req, res) => {
    let insertCampus = new CampusSchema(req.body);

    try {
        const results = await insertCampus.save();

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

exports.updateCampus = async (req, res) => {
    const { campus_id } = req.body;
    const campus = req.body;

    if(!mongoose.Types.ObjectId.isValid(campus_id)) return res.status(404).send('Invalid id.');

    const updated = await CampusSchema.findByIdAndUpdate(campus_id, campus, {new: true});

    res.json(updated);
}

exports.deleteCampus = async (req, res) => {
    const { campus_id } = req.query;

    if(!mongoose.Types.ObjectId.isValid(campus_id)) return res.status(404).send('Invalid id.');

    await CampusSchema.findByIdAndRemove(campus_id);

    res.json({ success: true });
}