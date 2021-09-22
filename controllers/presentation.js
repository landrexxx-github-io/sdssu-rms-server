const mongoose = require('mongoose');
const PresentationSchema = require('../models/presentation.js');

exports.getPresentation = async (req, res) => {
    try {
        const results = await PresentationSchema.find();

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

exports.createPresentation = async (req, res) => {
    let insertData = new PresentationSchema(req.body);

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

exports.updatePresentation = async (req, res) => {
    const { presentation_id } = req.body;
    const research = req.body;

    if (!mongoose.Types.ObjectId.isValid(presentation_id)) return res.status(404).send('Invalid id.');

    const updated = await PresentationSchema.findByIdAndUpdate(presentation_id, research, { new: true });

    res.json(updated);
}

exports.deletePresentation = async (req, res) => {
    const { research_id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(research_id)) 
        return res.status(404).send('Invalid id.');

    await PresentationSchema.findByIdAndRemove(research_id);

    res.json({ success: true });
}