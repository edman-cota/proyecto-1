const express = require('express');
const {
  createNode,
  getNodes,
  createProveedor,
  getProveedores,
  createSingleNode,
  getProductos,
  getOrdenes,
  getInventarios,
} = require('../controllers/nodesController'); // Verifica esta línea
const router = express.Router();

router.post('/', createNode);
router.get('/', getNodes);

router.post('/proveedor', createSingleNode);
router.get('/proveedores', getProveedores);

router.post('/producto', createSingleNode);
router.get('/productos', getProductos);

router.post('/orden', createSingleNode);
router.get('/ordenes', getOrdenes);

router.post('/inventario', createSingleNode);
router.get('/inventarios', getInventarios);

module.exports = router;
