const mongoose = require('mongoose');
const ProposalSchema = require('../models/proposal.js');
const path = require('path');
const fs = require('fs');

exports.getCompleted = async (req, res) => {
    try {
        // const results = await ProposalSchema.find({ 
        //     completed_status: 'completed' 
        // })
        const results = await ProposalSchema.find();

        if(results) {
            res.status(200).send({
                success: true
                , results
            });
        } else {
            res.status(404).send({
                success: false
                , results
            })
        }
    } catch (error) {
        res.status(404).send({ message: error })
    }
}

exports.getCompletedOptions = async (req, res) => {
    try {
        const results = await ProposalSchema.find({
            status: 'proposal'
            , remarks: 'approved'
        })

        if(results) {
            res.status(200).send({
                success: true
                , results
            });
        } else {
            res.status(404).send({
                success: false
                , results
            })
        }
    } catch (error) {
        res.status(404).send({ message: error })
    }
}

exports.createProposalCompleted = async (req, res) => {
    let insertData = new ProposalSchema(req.body);

    try {
        const results = await insertData.save();

        if(results) {
            res.status(201).send({
                success: true
                , results
            });
        } else {
            res.status(500).send({
                success: false
                , results
            })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

exports.updateCompleted = async (req, res) => {
    const { research_id } = req.body;
    const research = req.body;

    if (!mongoose.Types.ObjectId.isValid(research_id))
        return res.status(404).send('Invalid id.');

    const updated = await ProposalSchema.findByIdAndUpdate(research_id, research, { new: true });

    res.json(updated);
}

exports.updateProposalCompleted = async (req, res) => {
    const research = JSON.parse(req.body.data);
    const myFile = req.files.file;
    const myPath = path.join(process.cwd(), '/uploads/');
    const filePath = `${myPath}${myFile.name}`;

    if(!req.files) {
        return res.status(500).send("File not found.");
    }

    if(!mongoose.Types.ObjectId.isValid(research.research_id)) {
        return res.status(404).send("Invalid id.");
    }

    // checks the file extension if its PDF
    if(myFile.mimetype !== 'application/pdf') {
        return res.json({
            success: false
            , msg: 'Invalid file extension name. Upload PDF file only.'
        });
    }

    // checks of file already exists
    fs.access(filePath, async (fileNotExist) => {
        if(fileNotExist) {
            const updated = await ProposalSchema.findByIdAndUpdate(research.research_id, research, {new: true});

            if(updated) {
                myFile.mv(filePath, (error) => {
                    if(error) {
                        return res.status(500).send("Error occured");
                    }
        
                    res.json({
                        success: true
                        , results: updated
                        , name: myFile.name
                        , path: filePath
                    });
                })
            }
        } else {
            return res.send({
                success: false
                , msg: 'File name already exist' 
            })
        }
    })

    
}

// exports.deleteProposal = async (req, res) => {
//     const { research_id } = req.query;

//     if(!mongoose.Types.ObjectId.isValid(research_id)) return res.status(404).send('Invalid id.');

//     await ProposalSchema.findByIdAndRemove(research_id);

//     res.json({ success: true });
// }