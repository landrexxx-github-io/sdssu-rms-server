const express = require('express');
const router = express.Router();

const { 
    getUtilization
    , createUtilization
    , updateUtilization
    , deleteUtilization 
} = require('../controllers/utilization');

router.get('/', getUtilization);
router.post('/', createUtilization);
router.patch('/', updateUtilization);
router.delete('/', deleteUtilization);

module.exports = router;