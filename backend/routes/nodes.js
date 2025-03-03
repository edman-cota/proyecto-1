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
  deleteProveedor,
  deleteProducto,
  deleteOrden,
  deleteInventario,
  deleteTransporte,
  getAlmacenes,
  deleteAlmacen,
  deleteCliente,
  getClientes,
} = require('../controllers/nodesController');
const router = express.Router();

router.post('/', createNode);
router.get('/', getNodes);

router.post('/proveedor', createSingleNode);
router.get('/proveedores', getProveedores);
router.delete('/proveedor/:id', deleteProveedor);

router.post('/almacen', createSingleNode);
router.get('/almacenes', getAlmacenes);
router.delete('/almacen/:id', deleteAlmacen);

router.post('/cliente', createSingleNode);
router.get('/clientes', getClientes);
router.delete('/cliente/:id', deleteCliente);

router.post('/producto', createSingleNode);
router.get('/productos', getProductos);
router.delete('/producto/:id', deleteProducto);

router.post('/orden', createSingleNode);
router.get('/ordenes', getOrdenes);
router.delete('/orden/:id', deleteOrden);

router.post('/inventario', createSingleNode);
router.get('/inventarios', getInventarios);
router.delete('/inventario/:id', deleteInventario);

router.post('/transporte', createSingleNode);
router.get('/transportes', getTransportes);
router.delete('/transporte/:id', deleteTransporte);

module.exports = router;
