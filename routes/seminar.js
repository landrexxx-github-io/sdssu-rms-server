const express = require('express');
const router = express.Router();

const { 
     getSeminar, 
     createSeminar,
     updateSeminar,
     deleteSeminar
} = require('../controllers/seminar');

router.get('/', getSeminar);
router.post('/', createSeminar);
router.patch('/', updateSeminar);
router.delete('/', deleteSeminar);

module.exports = router;