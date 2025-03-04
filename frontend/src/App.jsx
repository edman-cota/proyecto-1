import './App.css';
import Navigation from '../components/Navigation';
import Proveedores from '../components/Proveedores';
import { Routes, Route } from 'react-router';
import Productos from '../components/Productos';
import Ordenes from '../components/Ordenes';
import Inventarios from '../components/Inventarios';
import Transportes from '../components/Transportes';
import Almacenes from '../components/Almancenes';
import Clientes from '../components/Clientes';
import Relaciones from '../components/Relaciones';

function App() {
  return (
    <div className='main'>
      <Navigation />

      <Routes>
        <Route path='proveedores' element={<Proveedores />} />
        <Route path='almacenes' element={<Almacenes />} />
        <Route path='clientes' element={<Clientes />} />

        <Route path='productos' element={<Productos />} />
        <Route path='ordenes' element={<Ordenes />} />
        <Route path='inventarios' element={<Inventarios />} />
        <Route path='transportes' element={<Transportes />} />

        <Route path='relaciones' element={<Relaciones />} />
      </Routes>
    </div>
  );
}

export default App;
