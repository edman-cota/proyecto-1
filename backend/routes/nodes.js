const express = require('express');
const { createNode, getNodes, createProveedor, getProveedores } = require('../controllers/nodesController'); // Verifica esta línea
const router = express.Router();

router.post('/', createNode);
router.get('/', getNodes);

router.post('/proveedor', createProveedor);
router.get('/proveedores', getProveedores);

module.exports = router;
