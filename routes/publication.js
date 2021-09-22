const express = require('express');
const router = express.Router();

const { 
    getPublication
    , createPublication
    , updatePublication
    , deletePublication 
} = require('../controllers/publication');

router.get('/', getPublication);
router.post('/', createPublication);
router.patch('/', updatePublication);
router.delete('/', deletePublication);

module.exports = router;