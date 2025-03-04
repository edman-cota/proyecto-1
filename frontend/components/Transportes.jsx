import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TransportesModal from './Modals/TransportesModal';

const Transportes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/nodos/transportes').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createSingleOrden = async () => {
    const label = 'Transporte';
    const properties = { estado: 'pendiente', cantidad: 4, tipo_pago: 'tarjeta', fecha: new Date() };

    await api.post('/nodos/transporte', { label, properties });

    fetchData();
  };

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Transportes</h2>

        <TransportesModal fetchData={fetchData} />
      </div>

      <div className='card'>
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
      </div>
    </main>
  );
};

export default Transportes;
