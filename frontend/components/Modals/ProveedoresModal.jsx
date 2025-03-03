import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const ProveedoresModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUnbicacion] = useState('');
  const [capacidad, setCapacidad] = useState(1000);
  const [tiempoEntrega, setTiempoEntrega] = useState(3);
  const [confiabilidad, setConfiabilidad] = useState(1);

  const createSingleProveedor = async () => {
    const label = 'Proveedor';
    const id = new Date().getTime();

    const properties = {
      id,
      nombre,
      ubicacion: ubicacion,
      capacidad_produccion: capacidad,
      tiempo_entrega: tiempoEntrega,
      confiabilidad: confiabilidad,
      activo: true,
    };

    await api.post('/nodos/proveedor', { label, properties });

    fetchProveedores();

    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Trigger asChild>
        <button className='DialogTrigger'>+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Crear nuevo proveedor</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Nombre</label>
              <input placeholder='Nombre' onChange={(event) => setNombre(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Ubicación</label>
              <input placeholder='Ubicación' onChange={(event) => setUnbicacion(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Producción máxima (unidades/mes)</label>
              <input
                placeholder='Producción máxima (unidades/mes)'
                onChange={(event) => setCapacidad(event.target.value)}
              />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Tiempo estimado de entrega (días)</label>
              <input
                placeholder='Tiempo estimado de entrega (días)'
                onChange={(event) => setTiempoEntrega(event.target.value)}
              />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Nivel de confianza en la entrega (0-1)</label>
              <input
                placeholder='Nivel de confianza en la entrega (0-1)'
                onChange={(event) => setConfiabilidad(event.target.value)}
              />
            </div>
          </div>

          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 30 }}
            onClick={() => createSingleProveedor()}
          >
            <button className='crear'>Crear</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProveedoresModal;
