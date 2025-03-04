import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { MdDelete } from 'react-icons/md';
import ClientesModal from './Modals/ClientesModal';

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
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Clientes</h2>

        <ClientesModal fetchProveedores={fetchData} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Demanda mensual</th>
              <th>Frecuencia de pedidos</th>
              <th>Nivel de prioridad</th>
              <th>Tipo</th>
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
                <td>{node.demanda_mensual}</td>
                <td>{node.frecuencia_pedidos}</td>
                <td>{node.nivel_prioridad}</td>
                <td>{node.tipo_cliente}</td>
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
      </div>
    </main>
  );
};

export default Clientes;
