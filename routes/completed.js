const express = require('express');
const router = express.Router();

const { 
    getCompleted
    , getCompletedOptions
    , createProposalCompleted
    , updateProposalCompleted
    , updateCompleted 
} = require('../controllers/completed');

router.get('/', getCompleted);
router.post('/', createProposalCompleted);
// router.patch('/', updateProposalCompleted);
router.patch('/', updateCompleted);
// router.delete('/', deleteDepartment);

module.exports = router;