import { Link } from 'react-router';
import { FaStore } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav>
      <p>Nodos</p>

      <Link to='/proveedores' style={{ color: 'white' }}>
        <FaStore />
        Proveedores
      </Link>

      <Link to='/almacenes' style={{ color: 'white' }}>
        <FaStore />
        Almacenes
      </Link>

      <Link to='/clientes' style={{ color: 'white' }}>
        <FaStore />
        Clientes
      </Link>

      <Link to='/productos' style={{ color: 'white' }}>
        <FaStore />
        Productos
      </Link>

      <Link to='/ordenes' style={{ color: 'white' }}>
        <FaStore />
        Ordenes
      </Link>

      <Link to='/inventarios' style={{ color: 'white' }}>
        <FaStore />
        Inventarios
      </Link>

      <Link to='/transportes' style={{ color: 'white' }}>
        <FaStore />
        Transportes
      </Link>

      <p>Relaciones</p>

      <Link to='/relaciones' style={{ color: 'white' }}>
        Crear nueva relacion
      </Link>
    </nav>
  );
};

export default Navigation;
