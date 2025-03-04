import React, { useEffect, useState } from 'react';
import api, { createRelationship } from '../../services/api';
import * as Dialog from '@radix-ui/react-dialog';

const ALMACENAModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fromId, setFromId] = useState('');
  const [fromLabel, setFromLabel] = useState('Almacen');
  const [toId, setToId] = useState('');
  const [toLabel, setToLabel] = useState('Producto');
  const [relationshipType, setRelationshipType] = useState('ALMACENA');

  const [almacenes, setAlmacenes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [properties, setProperties] = useState({
    capacidad_disponible: '',
    fecha_ingreso: new Date(),
    temperatura_requerida: '',
    costo_mantenimiento: '',
    dias_permitidos: '',
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
    api.get('/nodos/almacenes').then((res) => setAlmacenes(res.data));
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
                    <option value='Almacen'>Almacen</option>
                  </select>
                </div>

                <div>
                  <label>{fromLabel}</label>
                  <select value={fromId} onChange={(e) => setFromId(+e.target.value)}>
                    {almacenes.map((label) => (
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
                  placeholder='Espacio restante en unidades'
                  value={properties.capacidad_disponible}
                  onChange={(e) => setProperties({ ...properties, capacidad_disponible: +e.target.value })}
                />

                <input
                  type='number'
                  placeholder='Temperatura de almacenamiento'
                  value={properties.temperatura_requerida}
                  onChange={(e) => setProperties({ ...properties, temperatura_requerida: +e.target.value })}
                />

                <input
                  type='number'
                  placeholder='Costo de almacenamiento'
                  value={properties.costo_mantenimiento}
                  onChange={(e) => setProperties({ ...properties, costo_mantenimiento: +e.target.value })}
                />

                <input
                  type='number'
                  placeholder='Tiempo máximo de almacenamiento'
                  value={properties.dias_permitidos}
                  onChange={(e) => setProperties({ ...properties, dias_permitidos: +e.target.value })}
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

export default ALMACENAModal;
