import React, { useEffect, useState } from 'react';
import api from '../services/api';
import OrdenesModal from './Modals/OrdenesModal';
import { MdDelete } from 'react-icons/md';

const Ordenes = () => {
  const [nodes, setNodes] = useState([]);

  const fetchOrdenes = () => {
    api.get('/nodos/ordenes').then((res) => setNodes(res.data));
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const deleteOrden = async (id) => {
    await api.delete(`/nodos/orden/${id}`);

    fetchOrdenes();
  };

  return (
    <main style={{ width: '100%', marginTop: 40, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Ordenes</h2>

        <OrdenesModal fetchProveedores={fetchOrdenes} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Estado</th>
            <th>Cantidad productos</th>
            <th>Tipo de pago</th>
            <th>Fecha</th>
            <th>Eliminar</th>
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
              <td>
                <button title='Eliminar' className='deleteButton' onClick={() => deleteOrden(node.id)}>
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

export default Ordenes;
