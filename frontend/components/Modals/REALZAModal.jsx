import React, { useEffect, useState } from 'react';
import api, { createRelationship } from '../../services/api';
import * as Dialog from '@radix-ui/react-dialog';

const REALIZAModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Cliente');
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Orden');
  const [relationshipType, setRelationshipType] = useState('REALIZA');

  const [clientes, setClientes] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  const [properties, setProperties] = useState({
    fecha_orden: new Date(),
    cantidad_total: '',
    metodo_pago: 'Tarjeta',
    estado: 'Pendiente',
    urgente: true,
  });
  const estados = ['Pendiente', 'Procesada', 'Entregada'];
  const pagos = ['Tarjeta', 'Efectivo', 'Transferencia'];

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
    api.get('/nodos/clientes').then((res) => setClientes(res.data));
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
                    <option value='Cliente'>Cliente</option>
                  </select>
                </div>

                <div>
                  <label>{fromLabel}</label>
                  <select value={fromId} onChange={(e) => setFromId(+e.target.value)}>
                    {clientes.map((label) => (
                      <option value={label.id}>{label.nombre}</option>
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
                      <option value={label.id}>#{label.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Propiedades</p>

                <input
                  type='number'
                  placeholder='Total de productos'
                  value={properties.cantidad_total}
                  onChange={(e) => setProperties({ ...properties, cantidad_total: +e.target.value })}
                />

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  <label>Metodo de pago</label>
                  <select
                    value={properties.metodo_pago}
                    onChange={(e) => setProperties({ ...properties, metodo_pago: e.target.value })}
                  >
                    {pagos.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  <label>Estado de la compra</label>
                  <select
                    value={properties.estado}
                    onChange={(e) => setProperties({ ...properties, estado: e.target.value })}
                  >
                    {estados.map((item) => (
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

export default REALIZAModal;
