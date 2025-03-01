const express = require('express');
const { createRelationship, getRelationships } = require('../controllers/relationshipsController');

const router = express.Router();

router.post('/', createRelationship);
router.get('/', getRelationships);

module.exports = router;
