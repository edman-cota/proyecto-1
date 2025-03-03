import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import api from '../../services/api';

const ProductosModal = ({ fetchProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const createSingleProducto = async () => {
    const label = 'Producto';
    const id = new Date().getTime();

    const properties = {
      id,
      nombre,
      categoría: categoria,
      precio: +precio,
      stock,
    };

    await api.post('/nodos/producto', { label, properties });

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
          <Dialog.Title className='DialogTitle'>Crear nuevo producto</Dialog.Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Nombre</label>
              <input placeholder='Nombre' onChange={(event) => setNombre(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Categoría</label>
              <input placeholder='Categoría' onChange={(event) => setCategoria(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Precio</label>
              <input placeholder='Precio' onChange={(event) => setPrecio(event.target.value)} />
            </div>

            <div style={{ display: 'flex' }}>
              <label style={{ width: 200 }}>Stock</label>
              <input placeholder='Stock' onChange={(event) => setStock(event.target.value)} />
            </div>
          </div>

          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 30 }}
            onClick={() => createSingleProducto()}
          >
            <button className='crear'>Crear</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductosModal;
