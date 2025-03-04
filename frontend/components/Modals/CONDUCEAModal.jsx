import React, { useEffect, useState } from 'react';
import api, { createRelationship } from '../../services/api';
import * as Dialog from '@radix-ui/react-dialog';

const CONDUCEAModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Proveedor');
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Almacen');
  const [relationshipType, setRelationshipType] = useState('CONDUCE_A');

  const [proveedores, setProveedores] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);

  const [properties, setProperties] = useState({
    distancia: '',
    costo: '',
    tiempo_transito: '',
    capacidad_maxima: '',
    modo_transporte: 'Camión',
  });
  const modoTransportes = ['Camión', 'Barco', 'Avión'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRelationship(fromId, fromLabel, toId, toLabel, relationshipType, properties);

      setIsOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error al crear la relación', error);
    }
  };

  const fetchProveedores = () => {
    api.get('/nodos/proveedores').then((res) => setProveedores(res.data));
  };

  const fetchAlmacenes = () => {
    api.get('/nodos/almacenes').then((res) => setAlmacenes(res.data));
  };

  useEffect(() => {
    fetchProveedores();
    fetchAlmacenes();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Trigger asChild>
        <button className='DialogTrigger'>+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Crear nueva relacion</Dialog.Title>

          <div style={{ display: 'flex', width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: 50 }}>
                <div>
                  <label>Tipo de Nodo Origen</label>
                  <select value={fromLabel} onChange={(e) => setFromLabel(e.target.value)}>
                    <option value='Proveedor'>Proveedor</option>
                  </select>
                </div>

                <div>
                  <label>{fromLabel}</label>
                  <select value={fromId} onChange={(e) => setFromId(+e.target.value)}>
                    {proveedores.map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 50 }}>
                <div>
                  <label>Tipo de Nodo Destino</label>
                  <select value={toLabel} onChange={(e) => setToLabel(e.target.value)}>
                    <option value='Almacen'>Almacén</option>
                  </select>
                </div>

                <div>
                  <label>{toLabel}</label>
                  <select value={toId} onChange={(e) => setToId(+e.target.value)}>
                    {almacenes.map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Propiedades</p>

                <input
                  type='number'
                  placeholder='Distancia (km)'
                  value={properties.distancia}
                  onChange={(e) => setProperties({ ...properties, distancia: +e.target.value })}
                />
                <input
                  type='number'
                  placeholder='Costo'
                  value={properties.costo}
                  onChange={(e) => setProperties({ ...properties, costo: +e.target.value })}
                />
                <input
                  type='number'
                  placeholder='Tiempo de Tránsito (hrs)'
                  value={properties.tiempo_transito}
                  onChange={(e) => setProperties({ ...properties, tiempo_transito: +e.target.value })}
                />
                <input
                  type='number'
                  placeholder='Capacidad Máxima (kg)'
                  value={properties.capacidad_maxima}
                  onChange={(e) => setProperties({ ...properties, capacidad_maxima: +e.target.value })}
                />

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  <label>Modo Transporte</label>
                  <select
                    value={properties.modo_transporte}
                    onChange={(e) => setProperties({ ...properties, modo_transporte: e.target.value })}
                  >
                    {modoTransportes.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type='submit' className='createRelationship'>
                Crear Relación
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CONDUCEAModal;
