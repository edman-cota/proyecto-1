import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RelacionesModal from './Modals/RelacionesModal';
import { MdDelete } from 'react-icons/md';

const Relaciones = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Relaciones</h2>

        <RelacionesModal />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Ubicación</th>
              <th>Demanda mensual</th>
              <th>Frecuencia de pedidos</th>
              <th>Nivel de prioridad</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.ubicacion}</td>
                <td>{node.demanda_mensual}</td>
                <td>{node.frecuencia_pedidos}</td>
                <td>{node.nivel_prioridad}</td>
                <td>{node.tipo_cliente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Relaciones;
