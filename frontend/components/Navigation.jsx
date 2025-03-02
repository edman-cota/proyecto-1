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
      }}
    >
      <Link to='/proveedores' style={{ color: 'white' }}>
        Proveedores
      </Link>
    </nav>
  );
};

export default Navigation;
