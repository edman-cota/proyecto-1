import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Proveedores = () => {
  const [nodes, setNodes] = useState([]);

  const fetchProveedores = () => {
    api.get('/nodos/proveedores').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const createSingleProveedor = async () => {
    const label = 'Proveedor';
    const properties = { nombre: 'Proveedor C', ubicación: 'México', calificación: 5, activo: true };

    await api.post('/nodos/proveedor', { label, properties });

    fetchProveedores();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Proveedores</h2>

        <button className='addSingleNode' onClick={() => createSingleProveedor()}>
          +
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Calificación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.nombre}</td>
              <td>{node.ubicación}</td>
              <td>{node.calificación}</td>
              <td>{node.activo ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Proveedores;
