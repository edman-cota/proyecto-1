const driver = require('../config/neo4j');
const csvParser = require('../utils/csvParser');

exports.uploadCSV = async (req, res) => {
  try {
    const data = await csvParser(req.file.path);

    const session = driver.session();
    for (const item of data) {
      const keys = Object.keys(item)
        .map((k) => `${k}: $${k}`)
        .join(', ');
      await session.run(`CREATE (n:Producto {${keys}})`, item);
    }

    res.status(200).send('Datos cargados correctamente');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
