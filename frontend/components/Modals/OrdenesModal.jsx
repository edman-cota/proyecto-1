import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const OrdenesModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [cantidad, setCantidad] = useState('');
  const [pago, setPago] = useState('credito');

  const createSingleOrden = async () => {
    const label = 'Orden';
    const id = new Date().getTime();

    const properties = {
      id,
      estado: 'pendiente',
      cantidad,
      tipo_pago: pago,
      fecha: new Date(),
    };

    await api.post('/nodos/orden', { label, properties });

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
              <label style={{ width: 200 }}>Cantidad productos</label>
              <input placeholder='Cantidad productos' onChange={(event) => setCantidad(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Tipo de pago</label>

              <select name='pagos' id='pagos' onChange={(event) => setPago(event.target.value)}>
                <option value='credito'>Tarjeta de crédito</option>
                <option value='debito'>Tarjeta de débito</option>
                <option value='efectivo'>Efectivo</option>
                <option value='transferencia'>Transferencia</option>
              </select>
            </div>
          </div>

          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 30 }}
            onClick={() => createSingleOrden()}
          >
            <button className='crear'>Crear</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrdenesModal;
