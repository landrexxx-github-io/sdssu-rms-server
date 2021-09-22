const express = require('express');
const router = express.Router();

const { getCampus, createCampus, updateCampus, deleteCampus } = require('../controllers/campus.js');

router.get('/', getCampus);
router.post('/', createCampus);
router.patch('/', updateCampus);
router.delete('/', deleteCampus);

module.exports = router;