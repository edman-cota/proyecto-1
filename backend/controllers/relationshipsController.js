const driver = require('../config/neo4j');

exports.createRelationship = async (req, res) => {
  const { fromId, fromLabel, toId, toLabel, relationshipType, properties } = req.body;

  if (!fromId || !fromLabel || !toId || !toLabel || !relationshipType) {
    return res
      .status(400)
      .json({ error: 'Se requieren fromId, fromLabel, toId, toLabel y relationshipType' });
  }

  const session = driver.session();

  try {
    const keys = Object.keys(properties)
      .map((key) => `${key}: $${key}`)
      .join(', ');

    const query = `
            MATCH (a:${fromLabel} {id: $fromId}), (b:${toLabel} {id: $toId})
            CREATE (a)-[:${relationshipType} {${keys}}]->(b)
        `;

    await session.run(query, { fromId, toId, ...properties });

    res
      .status(201)
      .json({ message: `Relación ${relationshipType} creada correctamente entre ${fromLabel} y ${toLabel}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};

exports.getRelationships = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (start)-[r]->(end) 
      RETURN TYPE(r) AS type, 
             properties(r) AS properties, 
             startNode(r).nombre AS startName, 
             endNode(r).nombre AS endName
    `);

    const relationships = result.records.map((record) => ({
      ...record.get('properties'),
      type: record.get('type'),
      startName: record.get('startName'), // Nombre del nodo de inicio
      endName: record.get('endName'), // Nombre del nodo final
    }));

    res.json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
};
