const express = require('express');
const {
  createNode,
  getNodes,
  getProveedores,
  createSingleNode,
  getProductos,
  getOrdenes,
  getInventarios,
  getTransportes,
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

router.post('/transporte', createSingleNode);
router.get('/transportes', getTransportes);

module.exports = router;
