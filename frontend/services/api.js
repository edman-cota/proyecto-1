import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

export const createRelationship = async (fromId, fromLabel, toId, toLabel, relationshipType, properties) => {
  return api.post('/relaciones', { fromId, fromLabel, toId, toLabel, relationshipType, properties });
};

export default api;
