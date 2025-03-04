import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SUMINISTRAModal from './Modals/SUMINISTRAModal';

const SUMINISTRA = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data.filter((item) => item.type === 'SUMINISTRA')));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>SUMINISTRA</h2>

        <SUMINISTRAModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Proveedor</th>
              <th>Producto</th>
              <th>Cantidad mínima </th>
              <th>Precio unitario</th>
              <th>Frecuencia de entrega</th>
              <th>Descuento</th>
              <th>Días entrega</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.startName}</td>
                <td>{node.endName}</td>
                <td>{node.cantidad_minima}</td>
                <td>{node.precio_unitario}</td>
                <td>{node.frecuencia_entrega}</td>
                <td>{node.descuento}%</td>
                <td>{node.tiempo_entrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default SUMINISTRA;
