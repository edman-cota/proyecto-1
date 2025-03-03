import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProveedoresModal from './Modals/ProveedoresModal';
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
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Almacenes</h2>

        <AlmacenesModal fetchProveedores={fetchNodes} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Ubicacion</th>
            <th>Inventario actual</th>
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
              <td>{node.ubicacion}</td>
              <td>{node.inventario_actual}</td>
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

export default Almacenes;
