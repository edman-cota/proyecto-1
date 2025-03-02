import './App.css';
import Navigation from '../components/Navigation';
import Proveedores from '../components/Proveedores';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div className='main'>
      <Navigation />

      <Routes>
        <Route path='proveedores' element={<Proveedores />} />
      </Routes>
    </div>
  );
}

export default App;
