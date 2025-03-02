import './App.css';
import Navigation from '../components/Navigation';
import Proveedores from '../components/Proveedores';
import { Routes, Route } from 'react-router';
import Productos from '../components/Productos';
import Ordenes from '../components/Ordenes';
import Inventarios from '../components/Inventarios';

function App() {
  return (
    <div className='main'>
      <Navigation />

      <Routes>
        <Route path='proveedores' element={<Proveedores />} />
        <Route path='productos' element={<Productos />} />
        <Route path='ordenes' element={<Ordenes />} />
        <Route path='inventarios' element={<Inventarios />} />
      </Routes>
    </div>
  );
}

export default App;
