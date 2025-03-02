import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Ordenes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchOrdenes = () => {
    api.get('/nodos/ordenes').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const createSingleOrden = async () => {
    const label = 'Orden';
    const properties = { estado: 'pendiente', cantidad: 4, tipo_pago: 'tarjeta', fecha: new Date() };

    await api.post('/nodos/orden', { label, properties });

    fetchOrdenes();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Ordenes</h2>

        <button className='addSingleNode' onClick={() => createSingleOrden()}>
          +
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Estado</th>
            <th>Cantidad productos</th>
            <th>Tipo de pago</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.estado}</td>
              <td>{node.cantidad}</td>
              <td>{node.tipo_pago}</td>
              {/* <td>{new Date(node.fecha)}</td> */}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Ordenes;
