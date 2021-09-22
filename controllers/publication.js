const mongoose = require('mongoose');
const PublicationSchema = require('../models/publication');

exports.getPublication = async (req, res) => {
    try {
        const results = await PublicationSchema.find();

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

exports.createPublication = async (req, res) => {
    let insertData = new PublicationSchema(req.body);

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

exports.updatePublication = async (req, res) => {
    const { publication_id } = req.body;
    const research = req.body;

    if (!mongoose.Types.ObjectId.isValid(publication_id))
        return res.status(404).send('Invalid id.');

    const updated = await PublicationSchema.findByIdAndUpdate(publication_id, research, { new: true });

    res.json(updated);
}

exports.deletePublication = async (req, res) => {
    const { research_id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(research_id))
        return res.status(404).send('Invalid id.');

    await PublicationSchema.findByIdAndRemove(research_id);

    res.json({ success: true });
}