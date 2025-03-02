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
