const driver = require('../config/neo4j');

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

exports.getNodes = async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run('MATCH (n) RETURN n');
    const nodes = result.records.map((record) => record.get('n').properties);
    await session.close();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
