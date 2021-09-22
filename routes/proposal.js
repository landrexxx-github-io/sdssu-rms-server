const express = require('express');
const router = express.Router();

const { 
    getProposal
    , createProposal
    , updateProposal
    , updateProposalRemarks
    , deleteProposal 
} = require('../controllers/proposal.js');

router.get('/', getProposal);
router.post('/', createProposal);
router.patch('/', updateProposal);
router.delete('/', deleteProposal);

module.exports = router;