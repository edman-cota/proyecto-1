import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { MdDelete } from 'react-icons/md';
import AlmacenesModal from './Modals/AlmacenesModal';

const Almacenes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchNodes = () => {
    api.get('/nodos/almacenes').then((res) => setNodes(res.data));
  };

  const deleteNode = async (id) => {
    await api.delete(`/nodos/almacen/${id}`);

    fetchNodes();
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Almacenes</h2>

        <AlmacenesModal fetchProveedores={fetchNodes} />
      </div>

      <div className='card'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Inventario actual</th>
              <th>Ubicacion</th>
              <th>Estado</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr>
                <td>{node.id}</td>
                <td>{node.nombre}</td>
                <td>{node.capacidad}</td>
                <td>{node.inventario_actual}</td>
                <td>{node.ubicacion}</td>
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

export default Almacenes;
