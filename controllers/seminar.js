const mongoose = require('mongoose');
const SeminarSchema = require('../models/seminar');

exports.getSeminar = async (req, res) => {
    try {
        const results = await SeminarSchema.find();

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

exports.createSeminar = async (req, res) => {
    let insertData = new SeminarSchema(req.body);

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

exports.updateSeminar = async (req, res) => {
    const { seminar_id } = req.body;
    const seminar = req.body;

    if (!mongoose.Types.ObjectId.isValid(seminar_id))
        return res.status(404).send('Invalid id.');

    const updated = await SeminarSchema.findByIdAndUpdate(seminar_id, seminar, { new: true });

    res.json(updated);
}

exports.deleteSeminar = async (req, res) => {
    const { seminar_id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(seminar_id))
        return res.status(404).send('Invalid id.');

    await SeminarSchema.findByIdAndRemove(seminar_id);

    res.json({ success: true });
}