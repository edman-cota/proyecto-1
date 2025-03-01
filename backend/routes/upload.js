const express = require('express');
const { uploadCSV } = require('../controllers/relationshipsController');

const router = express.Router();

router.post('/', uploadCSV);

module.exports = router;
