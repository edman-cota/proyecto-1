import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

export const createRelationship = async (fromId, fromLabel, toId, toLabel, relationshipType, properties) => {
  return api.post('/relaciones', { fromId, fromLabel, toId, toLabel, relationshipType, properties });
};

export const getAvailableTransport = async (minCapacity = 10) => {
  return api.post('/nodos/available', { minCapacity });
};

export const optimizedRoutes = async (startLabel, startName, endLabel, endName, criteria) => {
  return api.post('/nodos/optimized', { startLabel, startName, endLabel, endName, criteria });
};

export default api;
