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
  const [tipo, setTipo] = useState('Tienda');

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
      tipo_cliente: tipo,
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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

              <select
                name='frecuencia'
                id='frecuencia'
                onChange={(event) => setFrecuencia(event.target.value)}
              >
                <option value='Diaria'>Diaria</option>
                <option value='Semanal'>Semanal</option>
                <option value='Mensual'>Mensual</option>
              </select>
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Nivel de prioridad</label>

              <select name='prioridad' id='prioridad' onChange={(event) => setPrioridad(event.target.value)}>
                <option value='Alta'>Alta</option>
                <option value='Media'>Media</option>
                <option value='Baja'>Baja</option>
              </select>
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Tipo de cliente</label>

              <select name='clientes' id='clientes' onChange={(event) => setTipo(event.target.value)}>
                <option value='Tienda'>Tienda</option>
                <option value='Consumidor Final'>Consumidor Final</option>
              </select>
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

export default ClientesModal;
