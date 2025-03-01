const driver = require('../config/neo4j');

class RelationshipModel {
  static async createRelationship(startNode, endNode, type, properties) {
    const keys = Object.keys(properties)
      .map((k) => `${k}: $${k}`)
      .join(', ');
    const session = driver.session();
    try {
      await session.run(
        `MATCH (a), (b) 
                 WHERE id(a) = $startId AND id(b) = $endId 
                 CREATE (a)-[r:${type} {${keys}}]->(b) RETURN r`,
        { startId: startNode, endId: endNode, ...properties }
      );
      return { message: 'Relación creada exitosamente' };
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await session.close();
    }
  }

  static async getAllRelationships() {
    const session = driver.session();
    try {
      const result = await session.run('MATCH ()-[r]->() RETURN r');
      return result.records.map((record) => record.get('r').properties);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await session.close();
    }
  }
}

module.exports = RelationshipModel;
