import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProveedoresModal from './Modals/ProveedoresModal';
import { MdDelete } from 'react-icons/md';

const Clientes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchData = () => {
    api.get('/nodos/clientes').then((res) => setNodes(res.data));
  };

  const deleteNode = async (id) => {
    await api.delete(`/nodos/cliente/${id}`);

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Clientes</h2>

        <ProveedoresModal fetchProveedores={fetchData} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Capacidad producción</th>
            <th>Tiempo de entrega</th>
            <th>Confiabilidad</th>
            <th>Estado</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.nombre}</td>
              <td>{node.ubicacion}</td>
              <td>{node.capacidad_produccion}</td>
              <td>{node.tiempo_entrega}</td>
              <td>{node.confiabilidad}</td>
              <td>{node.activo ? 'Activo' : 'Inactivo'}</td>

              <td>
                <button title='Eliminar' className='deleteButton' onClick={() => deleteNode(node.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Clientes;
