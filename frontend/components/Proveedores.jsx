import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProveedoresModal from './Modals/ProveedoresModal';
import { MdDelete } from 'react-icons/md';

const Proveedores = () => {
  const [nodes, setNodes] = useState([]);

  const fetchProveedores = () => {
    api.get('/nodos/proveedores').then((res) => setNodes(res.data));
  };

  const deleteProveedor = async (id) => {
    await api.delete(`/nodos/proveedor/${id}`);

    fetchProveedores();
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Proveedores</h2>

        <ProveedoresModal fetchProveedores={fetchProveedores} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Calificación</th>
            <th>Estado</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr>
              <td>{node.id}</td>
              <td>{node.nombre}</td>
              <td>{node.ubicación}</td>
              <td>{node.calificación}</td>
              <td>{node.activo ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button title='Eliminar' className='deleteButton' onClick={() => deleteProveedor(node.id)}>
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

export default Proveedores;
