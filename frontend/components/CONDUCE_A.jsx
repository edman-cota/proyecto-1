import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CONDUCEAModal from './Modals/CONDUCEAModal';

const CONDUCE_A = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data.filter((item) => item.type === 'CONDUCE_A')));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Relaciones</h2>

        <CONDUCEAModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Desde</th>
              <th>Hacia</th>
              <th>Distancia (km)</th>
              <th>Tipo de transporte</th>
              <th>Costo</th>
              <th>Capacidad máxima</th>
              <th>Tiempo transito (h)</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.startName}</td>
                <td>{node.endName}</td>
                <td>{node.distancia}</td>
                <td>{node.modo_transporte}</td>
                <td>{node.costo}</td>
                <td>{node.capacidad_maxima}</td>
                <td>{node.tiempo_transito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CONDUCE_A;
