import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api, { createRelationship } from '../../services/api';

const RelacionesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);

  const [relacion, setRelacion] = useState('CONDUCE_A');

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Proveedor'); // Valor por defecto
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Almacen'); // Valor por defecto
  const [relationshipType, setRelationshipType] = useState('CONDUCE_A');
  const [properties, setProperties] = useState({
    distancia: '',
    costo: '',
    tiempo_transito: '',
    capacidad_maxima: '',
    modo_transporte: '',
  });
  const relaciones = ['CONDUCE_A', 'ALMACENA'];
  const modoTransportes = ['Camión', 'Barco', 'Avión'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('fromId, fromLabel: ', fromId, fromLabel);
    console.log('properties: ', properties);

    try {
      await createRelationship(fromId, fromLabel, toId, toLabel, relationshipType, properties);
      alert('Relación creada exitosamente');
    } catch (error) {
      console.error('Error al crear la relación', error);
    }
  };

  const fetchClientes = () => {
    api.get('/nodos/clientes').then((res) => setClientes(res.data));
  };

  const fetchProveedores = () => {
    api.get('/nodos/proveedores').then((res) => setProveedores(res.data));
  };

  const fetchAlmacenes = () => {
    api.get('/nodos/almacenes').then((res) => setAlmacenes(res.data));
  };

  useEffect(() => {
    fetchClientes();
    fetchProveedores();
    fetchAlmacenes();
  }, []);

  const getLabels = (label) => {
    if (label === 'Proveedor') {
      return proveedores;
    }
    if (label === 'Almacen') {
      return almacenes;
    }

    return [];
  };

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
              <h2>Crear Relación</h2>

              <div style={{ display: 'flex', gap: 50 }}>
                <div>
                  <label>Tipo de Nodo Origen</label>
                  <select value={fromLabel} onChange={(e) => setFromLabel(e.target.value)}>
                    <option value='Proveedor'>Proveedor</option>
                    <option value='Almacen'>Almacén</option>
                    <option value='Cliente'>Cliente</option>
                  </select>
                </div>

                <div>
                  <label>{fromLabel}</label>
                  <select value={fromId} onChange={(e) => setFromId(+e.target.value)}>
                    {getLabels(fromLabel).map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label>Relacion</label>
                <select value={relacion} onChange={(e) => setRelacion(e.target.value)}>
                  {relaciones.map((r) => (
                    <option value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: 50 }}>
                <div>
                  <label>Tipo de Nodo Destino</label>
                  <select value={toLabel} onChange={(e) => setToLabel(e.target.value)}>
                    <option value='Proveedor'>Proveedor</option>
                    <option value='Almacen'>Almacén</option>
                    <option value='Cliente'>Cliente</option>
                  </select>
                </div>

                <div>
                  <label>{toLabel}</label>
                  <select value={toId} onChange={(e) => setToId(+e.target.value)}>
                    {getLabels(toLabel).map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {relacion === 'CONDUCE_A' && (
                <>
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

                  <div>
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
                </>
              )}

              <button type='submit'>Crear Relación</button>
            </form>
          </div>

          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 30 }}
            onClick={() => createNode()}
          >
            <button className='crear'>Crear</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RelacionesModal;
