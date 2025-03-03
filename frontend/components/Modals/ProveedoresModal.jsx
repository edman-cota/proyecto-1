import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const ProveedoresModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUnbicacion] = useState('');
  const [calificacion, setCalificacion] = useState(0);

  const createSingleProveedor = async () => {
    const label = 'Proveedor';
    const id = new Date().getTime();

    const properties = {
      id,
      nombre: nombre,
      ubicación: ubicacion,
      calificación: +calificacion,
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
              <label style={{ width: 200 }}>Calificación</label>
              <input placeholder='Calificación' onChange={(event) => setCalificacion(event.target.value)} />
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
