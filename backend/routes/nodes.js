const express = require('express');
const { createNode, getNodes } = require('../controllers/nodesController'); // Verifica esta línea
const router = express.Router();

router.post('/', createNode);
router.get('/', getNodes);

module.exports = router;
