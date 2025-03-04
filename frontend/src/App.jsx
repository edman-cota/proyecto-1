import './App.css';
import Navigation from '../components/Navigation';
import Proveedores from '../components/Proveedores';
import { Routes, Route } from 'react-router';
import Productos from '../components/Productos';
import Ordenes from '../components/Ordenes';
import Transportes from '../components/Transportes';
import Almacenes from '../components/Almancenes';
import Clientes from '../components/Clientes';
import Relaciones from '../components/Relaciones';
import CONDUCE_A from '../components/CONDUCE_A';
import SUMINISTRA from '../components/SUMINISTRA';
import REALIZA from '../components/REALIZA';
import ALMACENA from '../components/ALMACENA';
import TRANSPORTA from '../components/TRANSPORTA';

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
        <Route path='transportes' element={<Transportes />} />

        <Route path='relaciones' element={<Relaciones />} />
        <Route path='CONDUCE_A' element={<CONDUCE_A />} />
        <Route path='SUMINISTRA' element={<SUMINISTRA />} />
        <Route path='REALIZA' element={<REALIZA />} />
        <Route path='ALMACENA' element={<ALMACENA />} />
        <Route path='TRANSPORTA' element={<TRANSPORTA />} />
      </Routes>
    </div>
  );
}

export default App;
