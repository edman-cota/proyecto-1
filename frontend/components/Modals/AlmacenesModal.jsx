import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const AlmacenesModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUnbicacion] = useState('');
  const [capacidad, setCapacidad] = useState(1000);
  const [inventario, setInventario] = useState(0);

  const createNode = async () => {
    const label = 'Almacen';
    const id = new Date().getTime();

    const properties = {
      id,
      nombre,
      capacidad,
      ubicacion,
      inventario_actual: inventario,
      activo: true,
    };

    await api.post('/nodos/almacen', { label, properties });

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
          <Dialog.Title className='DialogTitle'>Crear nuevo orden</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Nombre</label>
              <input placeholder='Nombre' onChange={(event) => setNombre(event.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <label style={{ width: 200 }}>Ubicación</label>
            <input placeholder='Ubicación' onChange={(event) => setUnbicacion(event.target.value)} />
          </div>

          <div style={{ display: 'flex' }}>
            <label style={{ width: 200 }}>Capacidad</label>
            <input placeholder='Capacidad' onChange={(event) => setCapacidad(event.target.value)} />
          </div>

          <div style={{ display: 'flex' }}>
            <label style={{ width: 200 }}>Inventario</label>
            <input placeholder='Inventario' onChange={(event) => setInventario(event.target.value)} />
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

export default AlmacenesModal;
