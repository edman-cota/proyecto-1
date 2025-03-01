const driver = require('../config/neo4j');

exports.createRelationship = async (req, res) => {
  const { startNode, endNode, type, properties } = req.body;
  const keys = Object.keys(properties)
    .map((k) => `${k}: $${k}`)
    .join(', ');

  const session = driver.session();
  try {
    await session.run(
      `MATCH (a), (b) WHERE id(a) = $startId AND id(b) = $endId 
             CREATE (a)-[r:${type} {${keys}}]->(b)`,
      { startId: startNode, endId: endNode, ...properties }
    );
    res.status(201).send('Relación creada');
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getRelationships = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH ()-[r]->() RETURN r');
    const relationships = result.records.map((record) => record.get('r').properties);
    res.json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};
