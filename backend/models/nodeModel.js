const driver = require('../config/neo4j');

class NodeModel {
  static async createNode(label, properties) {
    const keys = Object.keys(properties)
      .map((k) => `${k}: $${k}`)
      .join(', ');
    const session = driver.session();
    try {
      await session.run(`CREATE (n:${label} {${keys}}) RETURN n`, properties);
      return { message: 'Nodo creado exitosamente' };
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await session.close();
    }
  }

  static async getAllNodes(label) {
    const session = driver.session();
    try {
      const result = await session.run(`MATCH (n:${label}) RETURN n`);
      return result.records.map((record) => record.get('n').properties);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await session.close();
    }
  }
}

module.exports = NodeModel;
