const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conectar a MongoDB
const { connectDB, seedData } = require('./models/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Removido: express.static para frontend - ahora usamos ng serve en puerto 4200

// Rutas
app.use('/api', require('./routes/api'));

// Removido: Ruta catch-all para servir frontend - ahora Angular maneja el frontend

// Iniciar servidor
const startServer = async () => {
  await connectDB();
  await seedData();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
