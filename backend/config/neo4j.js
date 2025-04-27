const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j+s://9db78229.databases.neo4j.io',
  neo4j.auth.basic('neo4j', 'r7tSh9SMUkICIr6g2pEgnlhNX9fDegoqW48UkGQF8c0')
);

module.exports = driver;
