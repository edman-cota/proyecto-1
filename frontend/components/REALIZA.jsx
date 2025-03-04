import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SUMINISTRAModal from './Modals/SUMINISTRAModal';
import REALIZAModal from './Modals/REALZAModal';

const REALIZA = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data.filter((item) => item.type === 'REALIZA')));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>REALIZA</h2>

        <REALIZAModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Cliente</th>
              <th>Orden</th>
              <th>Estado</th>
              <th>Metodo de pago</th>
              <th>Urgente</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.startName}</td>
                <td>{node.endName}</td>
                <td>{node.estado}</td>
                <td>{node.metodo_pago}</td>
                <td>{node.urgente ? 'Si' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default REALIZA;
