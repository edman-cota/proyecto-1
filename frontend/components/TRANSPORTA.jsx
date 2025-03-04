import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TRANSPORTAModal from './Modals/TRANSPORTAModal';

const TRANSPORTA = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data.filter((item) => item.type === 'TRANSPORTA')));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>TRANSPORTA</h2>

        <TRANSPORTAModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Transporte</th>
              <th>Orden</th>
              <th>Tipo de ruta</th>
              <th>Costo total del servicio</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.startName}</td>
                <td>{node.endName}</td>
                <td>{node.tipo_ruta}</td>
                <td>{node.costo_transporte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TRANSPORTA;
