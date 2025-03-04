import { Link } from 'react-router';
import { FaStore } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';

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

      <Link to='/transportes' style={{ color: 'white' }}>
        <FaStore />
        Transportes
      </Link>

      <p>Relaciones</p>

      <Link to='/relaciones' style={{ color: 'white' }}>
        Crear nueva relacion
      </Link>

      <Link to='/CONDUCE_A' style={{ color: 'white' }}>
        <FiLink />
        CONDUCE_A
      </Link>

      <Link to='/SUMINISTRA' style={{ color: 'white' }}>
        <FiLink />
        SUMINISTRA
      </Link>

      <Link to='/REALIZA' style={{ color: 'white' }}>
        <FiLink />
        REALIZA
      </Link>

      <Link to='/ALMACENA' style={{ color: 'white' }}>
        <FiLink />
        ALMACENA
      </Link>

      <Link to='/TRANSPORTA' style={{ color: 'white' }}>
        <FiLink />
        TRANSPORTA
      </Link>
    </nav>
  );
};

export default Navigation;
