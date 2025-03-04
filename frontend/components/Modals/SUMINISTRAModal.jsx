import React, { useEffect, useState } from 'react';
import api, { createRelationship } from '../../services/api';
import * as Dialog from '@radix-ui/react-dialog';

const SUMINISTRAModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Proveedor');
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Producto');
  const [relationshipType, setRelationshipType] = useState('SUMINISTRA');

  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  const [properties, setProperties] = useState({
    cantidad_minima: '',
    precio_unitario: '',
    frecuencia_entrega: 'Mensual',
    descuento: '',
    tiempo_entrega: '',
  });
  const frecuencias = ['Diaria', 'Semanal', 'Mensual'];

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

  const fetchProductos = () => {
    api.get('/nodos/productos').then((res) => setProductos(res.data));
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
                    <option value='Producto'>Producto</option>
                  </select>
                </div>

                <div>
                  <label>{toLabel}</label>
                  <select value={toId} onChange={(e) => setToId(+e.target.value)}>
                    {productos.map((label) => (
                      <option value={label.id}>{label.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Propiedades</p>

                <input
                  type='number'
                  placeholder='Cantidad mínima de compra'
                  value={properties.cantidad_minima}
                  onChange={(e) => setProperties({ ...properties, cantidad_minima: +e.target.value })}
                />
                <input
                  type='number'
                  placeholder='Precio por unidad'
                  value={properties.precio_unitario}
                  onChange={(e) => setProperties({ ...properties, precio_unitario: +e.target.value })}
                />
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                  <label>Frecuencia de entrega</label>
                  <select
                    value={properties.frecuencia_entrega}
                    onChange={(e) => setProperties({ ...properties, frecuencia_entrega: e.target.value })}
                  >
                    {frecuencias.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <input
                  type='number'
                  placeholder='Descuento por volumen'
                  value={properties.descuento}
                  onChange={(e) => setProperties({ ...properties, descuento: +e.target.value })}
                />
                <input
                  type='number'
                  placeholder='Días estimados para la entrega'
                  value={properties.tiempo_entrega}
                  onChange={(e) => setProperties({ ...properties, tiempo_entrega: +e.target.value })}
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

export default SUMINISTRAModal;
