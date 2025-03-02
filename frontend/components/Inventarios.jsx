import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Inventarios = () => {
  const [nodes, setNodes] = useState([]);

  const fetchInventarios = () => {
    api.get('/nodos/inventarios').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  const createSingleOrden = async () => {
    const label = 'Orden';
    const properties = { estado: 'pendiente', cantidad: 4, tipo_pago: 'tarjeta', fecha: new Date() };

    await api.post('/nodos/inventario', { label, properties });

    fetchInventarios();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Inventario</h2>

        <button className='addSingleNode' onClick={() => createSingleOrden()}>
          +
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ubicación</th>
            <th>Capacidad</th>
            <th>Fecha de vencimiento</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.ubicación}</td>
              <td>{node.capacidad}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Inventarios;
