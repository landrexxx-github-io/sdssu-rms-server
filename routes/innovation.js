const express = require('express');
const router = express.Router();

const { 
    getInnovation
    , createInnovation
    , updateInnovation
    , deleteInnovation 
} = require('../controllers/innovation');

router.get('/', getInnovation);
router.post('/', createInnovation);
router.patch('/', updateInnovation);
router.delete('/', deleteInnovation);

module.exports = router;