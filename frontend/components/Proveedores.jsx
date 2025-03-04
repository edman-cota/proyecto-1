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
    <main>
      <div className='navbar'></div>

      <div className='header'>
        <h2>Proveedores</h2>

        <ProveedoresModal fetchProveedores={fetchProveedores} />
      </div>

      <div className='card'>
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
                  <button title='Eliminar' className='deleteButton' onClick={() => deleteProveedor(node.id)}>
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

export default Proveedores;
