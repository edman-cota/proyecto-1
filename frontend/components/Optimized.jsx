import React, { useEffect, useState } from 'react';
import api, { getAvailableTransport, optimizedRoutes } from '../services/api';

const Optimized = () => {
  const [nodes, setNodes] = useState([]);
  const [overloaded, setOverloaded] = useState([]);
  const [available, setAvailable] = useState([]);

  const fetchProductos = async () => {
    // api.get('/nodos/productos').then((res) => setNodes(res.data));
    // const result = await optimizedRoutes('Proveedor', 'Proveedor A', 'Cliente', 'Supermercado A', 'costo');

    api.get('/nodos/overloaded').then((res) => setOverloaded(res.data.overloadedWarehouses));
  };

  const fetchAvailable = async () => {
    // api.get('/nodos/productos').then((res) => setNodes(res.data));
    // const result = await optimizedRoutes('Proveedor', 'Proveedor A', 'Cliente', 'Supermercado A', 'costo');
    const available = await getAvailableTransport(10);
    console.log('available: ', available);
    setAvailable(available.data.transportes);

    // api.post('/nodos/available').then((res) => setAvailable(res.data.transportes));
  };

  console.log('available: ', available);

  useEffect(() => {
    fetchProductos();
    fetchAvailable();
  }, []);

  return (
    <main style={{ overflowY: 'auto', height: '100%' }}>
      <div className='header'>
        <p>Detección de Almacenes Sobrecargados</p>
      </div>
      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Inventario</th>
              <th>ubicacion</th>
            </tr>
          </thead>
          <tbody>
            {overloaded.map((node, index) => (
              <tr key={index}>
                <td>{node.nombre}</td>
                <td>{node.capacidad}</td>
                <td>{node.inventario}</td>
                <td>{node.ubicacion}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='header'>
        <p>Filtrar Transporte Disponible</p>
      </div>
      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>tipo</th>
              <th>capacidad</th>
              <th>costo</th>
              <th>activo</th>
            </tr>
          </thead>
          <tbody>
            {available.map((node, index) => (
              <tr key={index}>
                <td>{node.tipo}</td>
                <td>{node.capacidad}</td>
                <td>{node.costo}</td>
                <td>{node.activo}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Optimized;
