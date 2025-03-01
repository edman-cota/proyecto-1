import React, { useEffect, useState } from 'react';
import api from '../services/api';
const NodeList = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    api.get('/nodos').then((res) => setNodes(res.data));
  }, []);

  return (
    <ul>
      {nodes.map((n, i) => (
        <li key={i}>{JSON.stringify(n)}</li>
      ))}
    </ul>
  );
};
export default NodeList;
