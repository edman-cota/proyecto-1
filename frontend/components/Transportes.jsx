import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Transportes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchInventarios = () => {
    api.get('/nodos/transportes').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  const createSingleOrden = async () => {
    const label = 'Transporte';
    const properties = { estado: 'pendiente', cantidad: 4, tipo_pago: 'tarjeta', fecha: new Date() };

    await api.post('/nodos/transporte', { label, properties });

    fetchInventarios();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Transportes</h2>

        <button className='addSingleNode' onClick={() => createSingleOrden()}>
          +
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo</th>
            <th>Capacidad</th>
            <th>Costo</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.tipo}</td>
              <td>{node.capacidad}</td>
              <td>{node.costo}</td>
              <td>{node.activo ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Transportes;
