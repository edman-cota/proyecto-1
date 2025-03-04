const express = require('express');
const cors = require('cors');
const nodesRoutes = require('./routes/nodes'); // Verifica esta línea
const relacionesRoutes = require('./routes/relationships');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/nodos', nodesRoutes);
app.use('/relaciones/', relacionesRoutes);

app.listen(5000, () => console.log('Backend en http://localhost:5000'));
