const mongoose = require('mongoose');
const UtilizationSchema = require('../models/utilization');

exports.getUtilization = async (req, res) => {
    try {
        const results = await UtilizationSchema.find();

        if (results) {
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
        res.status(404).send({ message: error })
    }
}

exports.createUtilization = async (req, res) => {
    let insertData = new UtilizationSchema(req.body);

    try {
        const results = await insertData.save();

        if (results) {
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
        res.status(500).send({ message: error })
    }
}

exports.updateUtilization = async (req, res) => {
    const { utilization_id } = req.body;
    const research = req.body;

    if (!mongoose.Types.ObjectId.isValid(utilization_id))
        return res.status(404).send('Invalid id.');

    const updated = await UtilizationSchema.findByIdAndUpdate(utilization_id, research, { new: true });

    res.json(updated);
}

exports.deleteUtilization = async (req, res) => {
    const { research_id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(research_id))
        return res.status(404).send('Invalid id.');

    await UtilizationSchema.findByIdAndRemove(research_id);

    res.json({ success: true });
}