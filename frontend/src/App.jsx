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
import CONDUCE_A from '../components/CONDUCE_A';
import SUMINISTRA from '../components/SUMINISTRA';
import REALIZA from '../components/REALIZA';

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
        <Route path='CONDUCE_A' element={<CONDUCE_A />} />
        <Route path='SUMINISTRA' element={<SUMINISTRA />} />
        <Route path='REALIZA' element={<REALIZA />} />
      </Routes>
    </div>
  );
}

export default App;
