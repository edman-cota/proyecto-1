import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ALMACENAModal from './Modals/ALMACENAModal';

const ALMACENA = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/relaciones').then((res) => setNodes(res.data.filter((item) => item.type === 'ALMACENA')));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>ALMACENA</h2>

        <ALMACENAModal fetchData={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Relación</th>
              <th>Almacen</th>
              <th>Producto</th>
              <th>Capacidad disponible</th>
              <th>Temperatura requerida</th>
              <th>Costo de mantenimiento</th>
              <th>Dias permitidos</th>
              <th>Fecha de ingreso</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.type}</td>
                <td>{node.startName}</td>
                <td>{node.endName}</td>
                <td>{node.capacidad_disponible}</td>
                <td>{node.temperatura_requerida}</td>
                <td>{node.costo_mantenimiento}</td>
                <td>{node.dias_permitidos}</td>
                <td>{node.fecha_ingreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ALMACENA;
