import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const ClientesModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUnbicacion] = useState('');
  const [demanda, setDemanda] = useState(0);
  const [frecuencia, setFrecuencia] = useState('Semanal');
  const [prioridad, setPrioridad] = useState('Alta');

  const createNode = async () => {
    const label = 'Cliente';
    const id = new Date().getTime();

    const properties = {
      id,
      nombre,
      ubicacion,
      demanda_mensual: +demanda,
      frecuencia_pedidos: frecuencia,
      nivel_prioridad: prioridad,
      activo: true,
    };

    await api.post('/nodos/cliente', { label, properties });

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
          <Dialog.Title className='DialogTitle'>Crear nuevo cliente</Dialog.Title>

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
            <label style={{ width: 200 }}>Demanda mensual</label>
            <input placeholder='Demanda mensual' onChange={(event) => setDemanda(event.target.value)} />
          </div>

          <div style={{ display: 'flex' }}>
            <label style={{ width: 200 }}>Frecuencia de pedidos</label>
            <input
              placeholder='Frecuencia de pedidos'
              onChange={(event) => setFrecuencia(event.target.value)}
            />
          </div>

          <div style={{ display: 'flex' }}>
            <label style={{ width: 200 }}>Nivel de prioridad</label>
            <input placeholder='Nivel de prioridad' onChange={(event) => setPrioridad(event.target.value)} />
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

export default ClientesModal;
