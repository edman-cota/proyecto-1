const driver = require('../config/neo4j');

const toInteger = (value) => {
  if (value && value.low !== undefined && value.high !== undefined) {
    return value.low + value.high * Math.pow(2, 32);
  }
  return value;
};

exports.createNode = async (req, res) => {
  try {
    const { label, properties } = req.body;
    const keys = Object.keys(properties)
      .map((k) => `${k}: $${k}`)
      .join(', ');
    const session = driver.session();
    await session.run(`CREATE (n:${label} {${keys}})`, properties);
    await session.close();
    res.send('Nodo creado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSingleNode = async (req, res) => {
  try {
    const { label, properties } = req.body;
    const keys = Object.keys(properties)
      .map((k) => `${k}: $${k}`)
      .join(', ');

    const session = driver.session();
    await session.run(`CREATE (n:${label} {${keys}})`, properties);
    await session.close();
    res.send('Nodo creado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNodes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (n) RETURN n');

    const nodes = result.records.map((record) => {
      const node = record.get('n').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedores = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (p:Proveedor) RETURN p');

    const nodes = result.records.map((record) => {
      const node = record.get('p').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Proveedor {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getAlmacenes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (p:Almacen) RETURN p');

    const nodes = result.records.map((record) => {
      const node = record.get('p').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlmacen = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Almacen {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getClientes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (p:Cliente) RETURN p');

    const nodes = result.records.map((record) => {
      const node = record.get('p').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  const session = driver.session();

  try {
    await session.run('MATCH (n:Cliente {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getProductos = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (p:Producto) RETURN p');

    const nodes = result.records.map((record) => {
      const node = record.get('p').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Producto {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getOrdenes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (o:Orden) RETURN o');

    const nodes = result.records.map((record) => {
      const node = record.get('o').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrden = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Orden {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getInventarios = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (i:Inventario) RETURN i');

    const nodes = result.records.map((record) => {
      const node = record.get('i').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInventario = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Inventario {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getTransportes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (t:Transporte) RETURN t');

    const nodes = result.records.map((record) => {
      const node = record.get('t').properties;

      Object.keys(node).forEach((key) => {
        node[key] = toInteger(node[key]);
      });

      return node;
    });

    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransporte = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del nodo de la URL
  const session = driver.session();

  try {
    await session.run('MATCH (n:Transporte {id: $id}) DELETE n', { id: parseInt(id) });
    res.json({ message: 'Nodo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getOptimizedRoute = async (req, res) => {
  const { startLabel, startName, endLabel, endName, criteria } = req.body; // `criteria` puede ser "costo", "tiempo_transito", "distancia"
  const session = driver.session();

  try {
    const query = `
      MATCH (start:${startLabel} {nombre: $startName}), (end:${endLabel} {nombre: $endName})
      CALL gds.shortestPath.dijkstra.stream({
        nodeProjection: '*',
        relationshipProjection: {
          RELACION: { type: '*', properties: $criteria }
        },
        startNode: start,
        endNode: end
      })
      YIELD index, sourceNode, targetNode, totalCost
      MATCH (n) WHERE id(n) = targetNode
      RETURN n.nombre AS name, labels(n) AS type, totalCost
    `;

    const result = await session.run(query, { startName, endName, criteria });

    const route = result.records.map((record) => ({
      name: record.get('name'),
      type: record.get('type')[0], // Tomamos el primer label
      cost: record.get('totalCost'),
    }));

    res.json({ optimizedRoute: route });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getOverloadedWarehouses = async (req, res) => {
  const session = driver.session();

  try {
    const query = `
      MATCH (a:Almacen)
      WHERE a.inventario_actual > a.capacidad
      RETURN a.nombre AS nombre, a.ubicacion AS ubicacion, a.inventario_actual AS inventario, a.capacidad AS capacidad
    `;

    const result = await session.run(query);

    const almacenes = result.records.map((record) => ({
      nombre: record.get('nombre'),
      ubicacion: record.get('ubicacion'),
      inventario: record.get('inventario'),
      capacidad: record.get('capacidad'),
    }));

    res.json({ overloadedWarehouses: almacenes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getAvailableTransport = async (req, res) => {
  const { minCapacity } = req.body; // Capacidad mínima requerida
  const session = driver.session();

  try {
    const query = `
      MATCH (t:Transporte)
      WHERE t.capacidad >= $minCapacity AND t.activo = true
      RETURN t.id AS id, t.tipo AS tipo, t.capacidad AS capacidad, t.costo AS costo
    `;

    const result = await session.run(query, { minCapacity });

    const transportes = result.records.map((record) => ({
      id: toInteger(record.get('id')),
      tipo: toInteger(record.get('tipo')),
      capacidad: toInteger(record.get('capacidad')),
      costo: toInteger(record.get('costo')),
    }));

    res.json({ transportes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};
