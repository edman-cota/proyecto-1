import React, { useEffect, useState } from 'react';
import api, { createRelationship } from '../../services/api';
import * as Dialog from '@radix-ui/react-dialog';

const rutas = ['Terrestre', 'Marítima', 'Aérea'];

const TRANSPORTAModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Transporte');
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Orden');
  const [relationshipType, setRelationshipType] = useState('TRANSPORTA');

  const [transportes, setTransportes] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  const [properties, setProperties] = useState({
    tipo_ruta: 'Terrestre',
    costo_transporte: '',
    seguro: true,
  });

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
    api.get('/nodos/transportes').then((res) => setTransportes(res.data));
  };

  const fetchProductos = () => {
    api.get('/nodos/ordenes').then((res) => setOrdenes(res.data));
  };

  useEffect(() => {
    fetchProveedores();
    fetchProductos();
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
                    <option value='Transporte'>Transporte</option>
                  </select>
                </div>

                <div>
                  <label>{fromLabel}</label>
                  <select value={fromId} onChange={(e) => setFromId(+e.target.value)}>
                    {transportes.map((label) => (
                      <option value={label.id}>{label.nombre || label.tipo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 50 }}>
                <div>
                  <label>Tipo de Nodo Destino</label>
                  <select value={toLabel} onChange={(e) => setToLabel(e.target.value)}>
                    <option value='Orden'>Orden</option>
                  </select>
                </div>

                <div>
                  <label>{toLabel}</label>
                  <select value={toId} onChange={(e) => setToId(+e.target.value)}>
                    {ordenes.map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Propiedades</p>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  <label>Tipo de ruta</label>
                  <select
                    value={properties.tipo_ruta}
                    onChange={(e) => setProperties({ ...properties, tipo_ruta: e.target.value })}
                  >
                    {rutas.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <input
                  type='number'
                  placeholder='Costo total del servicio'
                  value={properties.costo_transporte}
                  onChange={(e) => setProperties({ ...properties, costo_transporte: +e.target.value })}
                />
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

export default TRANSPORTAModal;
