import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const TransportesModal = ({ fetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [transporte, setTransporte] = useState('Camión');
  const [capacidad, setCapacidad] = useState('');
  const [costo, setCosto] = useState('');

  const transportes = ['Camión', 'Barco'];

  const createNode = async () => {
    const label = 'Transporte';
    const id = new Date().getTime();

    const properties = {
      id,
      tipo: transporte,
      nombre: transporte,
      capacidad,
      costo,
      activo: true,
    };

    await api.post('/nodos/transporte', { label, properties });

    fetchData();

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
          <Dialog.Title className='DialogTitle'>Crear nuevo transporte</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Tipo de transporte</label>

              <select
                name='transporte'
                id='transporte'
                onChange={(event) => setTransporte(event.target.value)}
              >
                {transportes.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Capacidad</label>
              <input placeholder='Capacidad' onChange={(event) => setCapacidad(+event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Costo</label>
              <input placeholder='Costo' onChange={(event) => setCosto(+event.target.value)} />
            </div>
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

export default TransportesModal;
