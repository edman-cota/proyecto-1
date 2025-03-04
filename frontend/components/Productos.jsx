import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductosModal from './Modals/ProductosModal';
import { MdDelete } from 'react-icons/md';

const Productos = () => {
  const [nodes, setNodes] = useState([]);

  const fetchProductos = () => {
    api.get('/nodos/productos').then((res) => setNodes(res.data));
  };

  const deleteProducto = async (id) => {
    await api.delete(`/nodos/producto/${id}`);

    fetchProductos();
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Productos</h2>

        <ProductosModal fetchProveedores={fetchProductos} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr>
                <td>{node.id}</td>
                <td>{node.nombre}</td>
                <td>{node.categoría}</td>
                <td>{node.precio}</td>
                <td>{node.stock}</td>
                <td>
                  <button title='Eliminar' className='deleteButton' onClick={() => deleteProducto(node.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Productos;
