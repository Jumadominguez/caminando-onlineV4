const mongoose = require('mongoose');

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/caminando_online');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Modelo para usuarios
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Modelo para mockups
const MockupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  data: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

const Mockup = mongoose.model('Mockup', MockupSchema);

// Insertar datos de ejemplo si no existen
const seedData = async () => {
  try {
    const count = await Mockup.countDocuments();
    if (count === 0) {
      await Mockup.insertMany([
        {
          name: 'Home Page',
          description: 'Contenido de la página principal',
          data: { title: 'Bienvenido', content: 'Contenido de ejemplo' }
        },
        {
          name: 'About',
          description: 'Página de información',
          data: { title: 'Sobre nosotros', content: 'Información de la empresa' }
        }
      ]);
      console.log('Datos de ejemplo insertados');
    }
  } catch (error) {
    console.error('Error insertando datos de ejemplo:', error);
  }
};

module.exports = { connectDB, User, Mockup, seedData };
