const mongoose = require('mongoose');
const ProposalSchema = require('../models/proposal.js');

exports.getProposal = async (req, res) => {
    try {
        const results = await ProposalSchema.find();

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
        res.status(404).send({ message: error })
    }
}

// exports.getProposal = async (req, res) => {
//     try {
//         const results = await ProposalSchema.find({ remarks: 'pending' });

//         if(results) {
//             res.status(200).send({
//                 success: true,
//                 results
//             });
//         } else {
//             res.status(404).send({
//                 success: false,
//                 results
//             })
//         }
//     } catch (error) {
//         res.status(404).send({ message: error })
//     }
// }

exports.createProposal = async (req, res) => {
    let insertData = new ProposalSchema(req.body);

    try {
        const results = await insertData.save();

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
        res.status(500).send({ message: error })
    }
}

exports.updateProposal = async (req, res) => {
    const { research_id } = req.body;
    const research = req.body;

    if(!mongoose.Types.ObjectId.isValid(research_id)) return res.status(404).send('Invalid id.');

    const updated = await ProposalSchema.findByIdAndUpdate(research_id, research, {new: true});

    res.json(updated);
}

exports.deleteProposal = async (req, res) => {
    const { research_id } = req.query;

    if(!mongoose.Types.ObjectId.isValid(research_id)) return res.status(404).send('Invalid id.');

    await ProposalSchema.findByIdAndRemove(research_id);

    res.json({ success: true });
}