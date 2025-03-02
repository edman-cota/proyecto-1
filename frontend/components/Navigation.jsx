import { Link } from 'react-router';
const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
        backgroundColor: '#0F1324',
        height: '100%',
        width: 240,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
      }}
    >
      <Link to='/proveedores' style={{ color: 'white' }}>
        Proveedores
      </Link>

      <Link to='/productos' style={{ color: 'white' }}>
        Productos
      </Link>

      <Link to='/ordenes' style={{ color: 'white' }}>
        Ordenes
      </Link>
    </nav>
  );
};

export default Navigation;
