const express = require('express');
const router = express.Router();

const { 
    getPresentation
    , createPresentation
    , updatePresentation
    , deletePresentation 
} = require('../controllers/presentation');

router.get('/', getPresentation);
router.post('/', createPresentation);
router.patch('/', updatePresentation);
router.delete('/', deletePresentation);

module.exports = router;