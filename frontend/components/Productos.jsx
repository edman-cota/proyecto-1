import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Productos = () => {
  const [nodes, setNodes] = useState([]);

  const fetchProductos = () => {
    api.get('/nodos/productos').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const createSingleProducto = async () => {
    const label = 'Producto';
    const properties = { nombre: 'Teclado', categoría: 'Electrónica', precio: 289, stock: 5 };

    await api.post('/nodos/producto', { label, properties });

    fetchProductos();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Productos</h2>

        <button className='addSingleNode' onClick={() => createSingleProducto()}>
          +
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Productos;
