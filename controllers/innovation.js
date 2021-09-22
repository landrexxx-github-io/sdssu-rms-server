const mongoose = require('mongoose');
const InnovationSchema = require('../models/innovation');

exports.getInnovation = async (req, res) => {
    try {
        const results = await InnovationSchema.find();

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

exports.createInnovation = async (req, res) => {
    let insertData = new InnovationSchema(req.body);

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

exports.updateInnovation = async (req, res) => {
    const { innovation_id } = req.body;
    const innovation = req.body;

    if (!mongoose.Types.ObjectId.isValid(innovation_id))
        return res.status(404).send('Invalid id.');

    const updated = await InnovationSchema.findByIdAndUpdate(innovation_id, innovation, { new: true });

    res.json(updated);
}

exports.deleteInnovation = async (req, res) => {
    const { innovation_id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(innovation_id))
        return res.status(404).send('Invalid id.');

    await InnovationSchema.findByIdAndRemove(innovation_id);

    res.json({ success: true });
}