import { Link } from 'react-router';
const Navigation = () => {
  return (
    <nav>
      <Link to='/proveedores' style={{ color: 'white' }}>
        Proveedores
      </Link>

      <Link to='/productos' style={{ color: 'white' }}>
        Productos
      </Link>

      <Link to='/ordenes' style={{ color: 'white' }}>
        Ordenes
      </Link>

      <Link to='/inventarios' style={{ color: 'white' }}>
        Inventarios
      </Link>

      <Link to='/transportes' style={{ color: 'white' }}>
        Transportes
      </Link>
    </nav>
  );
};

export default Navigation;
