const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j+s://2ed3ff71.databases.neo4j.io',
  neo4j.auth.basic('neo4j', 'Vd2G0svETnztSSziDjLakYuM-22hPO7Iwi6VGNcfUm0')
);

module.exports = driver;
