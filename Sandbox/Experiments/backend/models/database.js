const mongoose = require('mongoose');

// ===== CONFIGURACIÓN DE CONEXIONES =====

// Base de datos principal para datos compartidos
const MAIN_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/db-caminando-online';

// Conexiones específicas para cada supermercado
const SUPERMERCADO_DBS = {
  carrefour: process.env.CARREFOUR_DB_URI || 'mongodb://localhost:27017/db-carrefour',
  disco: process.env.DISCO_DB_URI || 'mongodb://localhost:27017/db-disco',
  dia: process.env.DIA_DB_URI || 'mongodb://localhost:27017/db-dia',
  jumbo: process.env.JUMBO_DB_URI || 'mongodb://localhost:27017/db-jumbo',
  vea: process.env.VEA_DB_URI || 'mongodb://localhost:27017/db-vea'
};

// Conexiones acti    console.log('🎉 Datos de ejemplo insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando datos de ejemplo:', error);
  }
};

// ===== EXPORTAR =====

module.exports = {
  connectAllDBs,
  getConnection,
  getSupermarketModels,
  initializeModels,
  seedData,
  generateOrderNumber,
  // Modelos principales
  User,
  Address,
  GlobalOrder,
  // Configuración
  SUPERMERCADO_DBS
};s = {};

// Conectar a base de datos principal
const connectMainDB = async () => {
  try {
    const conn = await mongoose.createConnection(MAIN_DB_URI);
    connections.main = conn;
    console.log('✅ Conectado a base de datos principal: db-caminando-online');
    return conn;
  } catch (error) {
    console.error('❌ Error conectando a base de datos principal:', error);
    throw error;
  }
};

// Conectar a base de datos de supermercado específico
const connectSupermarketDB = async (supermarketName) => {
  try {
    if (!SUPERMERCADO_DBS[supermarketName]) {
      throw new Error(`Supermercado ${supermarketName} no encontrado`);
    }

    const conn = await mongoose.createConnection(SUPERMERCADO_DBS[supermarketName]);
    connections[supermarketName] = conn;
    console.log(`✅ Conectado a base de datos de ${supermarketName}: ${SUPERMERCADO_DBS[supermarketName]}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error conectando a base de datos de ${supermarketName}:`, error);
    throw error;
  }
};

// Conectar a todas las bases de datos
const connectAllDBs = async () => {
  try {
    // Conectar base principal
    await connectMainDB();

    // Conectar bases de supermercados
    const supermarketPromises = Object.keys(SUPERMERCADO_DBS).map(async (supermarket) => {
      try {
        await connectSupermarketDB(supermarket);
      } catch (error) {
        console.warn(`⚠️  No se pudo conectar a ${supermarket}: ${error.message}`);
      }
    });

    await Promise.all(supermarketPromises);
    console.log('🎉 Todas las conexiones de base de datos establecidas');
  } catch (error) {
    console.error('❌ Error en conexiones de base de datos:', error);
    process.exit(1);
  }
};

// Obtener conexión por nombre
const getConnection = (name = 'main') => {
  if (!connections[name]) {
    throw new Error(`Conexión ${name} no encontrada`);
  }
  return connections[name];
};

// ===== MODELOS PARA BASE DE DATOS PRINCIPAL =====

// Modelo para usuarios (base principal)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isActive: { type: Boolean, default: true },
  preferredSupermarkets: [{ type: String, enum: Object.keys(SUPERMERCADO_DBS) }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Modelo para direcciones de usuario (base principal)
const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // Casa, Trabajo, etc.
  street: { type: String, required: true },
  number: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'Argentina' },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Modelo para pedidos globales (base principal)
const GlobalOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supermarketName: { type: String, required: true, enum: Object.keys(SUPERMERCADO_DBS) },
  supermarketOrderId: { type: String, required: true }, // ID del pedido en la BD del supermercado
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'debit_card', 'mercado_pago'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  deliveryAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  deliveryNotes: { type: String },
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS PARA BASES DE DATOS DE SUPERMERCADOS =====

// Esquema base para productos de supermercado
const createProductSchema = (supermarketName) => {
  return new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Para ofertas
    category: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String },
    unit: { type: String, enum: ['kg', 'unidad', 'litro', 'paquete'], default: 'unidad' },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isOnSale: { type: Boolean, default: false },
    tags: [{ type: String }], // orgánico, sin gluten, etc.
    barcode: { type: String },
    brand: { type: String },
    weight: { type: Number }, // en gramos
    volume: { type: Number }, // en ml
    nutritionalInfo: {
      calories: { type: Number },
      proteins: { type: Number },
      carbs: { type: Number },
      fats: { type: Number }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
};

// Esquema para pedidos específicos de supermercado
const createOrderSchema = (supermarketName) => {
  return new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    globalOrderId: { type: String, required: true }, // Referencia al pedido global
    userId: { type: String, required: true }, // ID del usuario (de BD principal)
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true }
    }],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'],
      default: 'pending'
    },
    deliveryAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    deliveryNotes: { type: String },
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    assignedEmployee: { type: String }, // Empleado asignado para preparación/entrega
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
};

// Esquema para categorías de productos por supermercado
const createCategorySchema = (supermarketName) => {
  return new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
};

// Esquema para inventario por supermercado
const createInventorySchema = (supermarketName) => {
  return new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    currentStock: { type: Number, default: 0 },
    minimumStock: { type: Number, default: 0 },
    maximumStock: { type: Number, default: 1000 },
    lastRestockDate: { type: Date },
    nextRestockDate: { type: Date },
    supplier: { type: String },
    location: { type: String }, // Ubicación en el almacén
    alerts: [{
      type: { type: String, enum: ['low_stock', 'expired', 'damaged'] },
      message: { type: String },
      date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
};

// ===== CREACIÓN DE MODELOS =====

// Modelos de base de datos principal
let User, Address, GlobalOrder;

// Modelos por supermercado
const supermarketModels = {};

// Función para inicializar modelos
const initializeModels = async () => {
  try {
    // Inicializar modelos de base principal
    const mainConn = getConnection('main');
    User = mainConn.model('User', UserSchema);
    Address = mainConn.model('Address', AddressSchema);
    GlobalOrder = mainConn.model('GlobalOrder', GlobalOrderSchema);

    // Inicializar modelos para cada supermercado
    for (const [supermarketName, conn] of Object.entries(connections)) {
      if (supermarketName === 'main') continue;

      const ProductSchema = createProductSchema(supermarketName);
      const OrderSchema = createOrderSchema(supermarketName);
      const CategorySchema = createCategorySchema(supermarketName);
      const InventorySchema = createInventorySchema(supermarketName);

      supermarketModels[supermarketName] = {
        Product: conn.model('Product', ProductSchema),
        Order: conn.model('Order', OrderSchema),
        Category: conn.model('Category', CategorySchema),
        Inventory: conn.model('Inventory', InventorySchema)
      };
    }

    console.log('✅ Modelos inicializados correctamente');
  } catch (error) {
    console.error('❌ Error inicializando modelos:', error);
    throw error;
  }
};

// ===== FUNCIONES DE UTILIDAD =====

// Generar número de orden único
const generateOrderNumber = (supermarketName = '') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const prefix = supermarketName ? supermarketName.toUpperCase().slice(0, 3) : 'ORD';
  return `${prefix}-${timestamp}-${random}`;
};

// Obtener modelos de un supermercado específico
const getSupermarketModels = (supermarketName) => {
  if (!supermarketModels[supermarketName]) {
    throw new Error(`Modelos para supermercado ${supermarketName} no encontrados`);
  }
  return supermarketModels[supermarketName];
};

// ===== DATOS DE EJEMPLO =====

// Insertar datos de ejemplo
const seedData = async () => {
  try {
    console.log('🌱 Insertando datos de ejemplo...');

    // Datos de ejemplo para base principal
    const mainConn = getConnection('main');

    // Usuario admin
    const adminUser = new User({
      username: 'admin',
      email: 'admin@caminandoonline.com',
      password: '$2b$10$hashedpassword', // En producción usar bcrypt
      firstName: 'Admin',
      lastName: 'Sistema',
      role: 'admin'
    });

    // Verificar si ya existe
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      await adminUser.save();
      console.log('✅ Usuario admin creado');
    }

    // Insertar datos de ejemplo para cada supermercado
    const sampleProducts = {
      carrefour: [
        { name: 'Manzanas Fuji', price: 180, category: 'Frutas y Verduras', unit: 'kg', stock: 50 },
        { name: 'Leche La Serenísima', price: 220, category: 'Lácteos', unit: 'unidad', stock: 30 },
        { name: 'Pan Lactal', price: 160, category: 'Panadería', unit: 'unidad', stock: 25 }
      ],
      disco: [
        { name: 'Bananas', price: 140, category: 'Frutas y Verduras', unit: 'kg', stock: 40 },
        { name: 'Yogur Griego', price: 180, category: 'Lácteos', unit: 'unidad', stock: 35 },
        { name: 'Café Molido', price: 450, category: 'Desayuno', unit: 'paquete', stock: 20 }
      ],
      dia: [
        { name: 'Naranjas', price: 160, category: 'Frutas y Verduras', unit: 'kg', stock: 45 },
        { name: 'Queso Cremoso', price: 350, category: 'Lácteos', unit: 'unidad', stock: 20 },
        { name: 'Galletitas Oreo', price: 280, category: 'Snacks', unit: 'paquete', stock: 30 }
      ],
      jumbo: [
        { name: 'Peras', price: 190, category: 'Frutas y Verduras', unit: 'kg', stock: 35 },
        { name: 'Manteca', price: 240, category: 'Lácteos', unit: 'unidad', stock: 25 },
        { name: 'Cereal Corn Flakes', price: 320, category: 'Desayuno', unit: 'paquete', stock: 15 }
      ],
      vea: [
        { name: 'Mandarinas', price: 170, category: 'Frutas y Verduras', unit: 'kg', stock: 40 },
        { name: 'Huevos', price: 280, category: 'Proteínas', unit: 'docena', stock: 20 },
        { name: 'Arroz Gallo', price: 190, category: 'Almacén', unit: 'paquete', stock: 40 }
      ]
    };

    // Insertar productos para cada supermercado
    for (const [supermarketName, products] of Object.entries(sampleProducts)) {
      const models = getSupermarketModels(supermarketName);
      const existingProducts = await models.Product.countDocuments();

      if (existingProducts === 0) {
        await models.Product.insertMany(products);
        console.log(`✅ Productos de ejemplo insertados en ${supermarketName}`);
      }
    }

    console.log('🎉 Datos de ejemplo insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando datos de ejemplo:', error);
  }
};

// ===== EXPORTAR =====

module.exports = {
  connectAllDBs,
  getConnection,
  getSupermarketModels,
  initializeModels,
  seedData,
  generateOrderNumber,
  // Modelos principales
  User,
  Address,
  GlobalOrder,
  // Configuración
  SUPERMERCADO_DBS
};

// ===== MODELOS DE USUARIOS =====

// Modelo para usuarios
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Modelo para direcciones de usuario
const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // Casa, Trabajo, etc.
  street: { type: String, required: true },
  number: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'Argentina' },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ===== MODELOS DE SUPERMERCADOS =====

// Modelo para supermercados
const SupermarketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  description: { type: String },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  phone: { type: String },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  deliveryRadius: { type: Number, default: 10 }, // en km
  deliveryFee: { type: Number, default: 0 },
  minimumOrder: { type: Number, default: 0 },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS DE PRODUCTOS =====

// Modelo para categorías de productos
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelo para productos
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // Para ofertas
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  supermarketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supermarket', required: true },
  image: { type: String },
  unit: { type: String, enum: ['kg', 'unidad', 'litro', 'paquete'], default: 'unidad' },
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  tags: [{ type: String }], // orgánico, sin gluten, etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS DE PEDIDOS =====

// Modelo para items del carrito/pedido
const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // precio al momento de agregar
  total: { type: Number, required: true }
});

// Modelo para pedidos
const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supermarketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supermarket', required: true },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'debit_card', 'mercado_pago'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  deliveryAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  deliveryNotes: { type: String },
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS DE REVIEWS Y CALIFICACIONES =====

// Modelo para reviews de productos
const ProductReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  isVerified: { type: Boolean, default: true }, // compra verificada
  createdAt: { type: Date, default: Date.now }
});

// Modelo para reviews de supermercados
const SupermarketReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supermarketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supermarket', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  aspects: {
    delivery: { type: Number, min: 1, max: 5 },
    productQuality: { type: Number, min: 1, max: 5 },
    service: { type: Number, min: 1, max: 5 }
  },
  createdAt: { type: Date, default: Date.now }
});

// ===== MODELOS LEGACY (MANTENER PARA COMPATIBILIDAD) =====

// Modelo para mockups (legacy)
const MockupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  data: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

// ===== EXPORTAR MODELOS =====

const User = mongoose.model('User', UserSchema);
const Address = mongoose.model('Address', AddressSchema);
const Supermarket = mongoose.model('Supermarket', SupermarketSchema);
const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);
const ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
const SupermarketReview = mongoose.model('SupermarketReview', SupermarketReviewSchema);
const Mockup = mongoose.model('Mockup', MockupSchema);

// Función para generar número de orden único
const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// Insertar datos de ejemplo si no existen
const seedData = async () => {
  try {
    // Verificar si ya existen datos
    const userCount = await User.countDocuments();
    const supermarketCount = await Supermarket.countDocuments();
    const categoryCount = await Category.countDocuments();

    if (userCount === 0 && supermarketCount === 0 && categoryCount === 0) {
      console.log('Insertando datos de ejemplo...');

      // Crear usuario admin
      const adminUser = new User({
        username: 'admin',
        email: 'admin@caminandoonline.com',
        password: '$2b$10$hashedpassword', // En producción usar bcrypt
        firstName: 'Admin',
        lastName: 'Sistema',
        role: 'admin'
      });
      await adminUser.save();

      // Crear categorías
      const categories = await Category.insertMany([
        { name: 'Frutas y Verduras', icon: '🥕' },
        { name: 'Carnes y Pescados', icon: '🥩' },
        { name: 'Lácteos', icon: '🥛' },
        { name: 'Panadería', icon: '🍞' },
        { name: 'Bebidas', icon: '🥤' },
        { name: 'Limpieza', icon: '🧹' },
        { name: 'Perfumería', icon: '🧴' }
      ]);

      // Crear supermercados
      const supermarkets = await Supermarket.insertMany([
        {
          name: 'Carrefour',
          logo: '🏪',
          description: 'Supermercado líder en Argentina',
          address: {
            street: 'Av. Corrientes',
            number: '1234',
            city: 'Buenos Aires',
            state: 'Buenos Aires',
            zipCode: '1000'
          },
          phone: '+54 11 1234-5678',
          deliveryFee: 150,
          minimumOrder: 500
        },
        {
          name: 'Jumbo',
          logo: '🛒',
          description: 'Calidad y variedad',
          address: {
            street: 'Av. Santa Fe',
            number: '5678',
            city: 'Buenos Aires',
            state: 'Buenos Aires',
            zipCode: '1000'
          },
          phone: '+54 11 8765-4321',
          deliveryFee: 120,
          minimumOrder: 400
        }
      ]);

      // Crear productos de ejemplo
      const products = [
        { name: 'Manzanas Rojas', price: 150, categoryId: categories[0]._id, supermarketId: supermarkets[0]._id, unit: 'kg' },
        { name: 'Bananas', price: 120, categoryId: categories[0]._id, supermarketId: supermarkets[0]._id, unit: 'kg' },
        { name: 'Leche Entera', price: 200, categoryId: categories[2]._id, supermarketId: supermarkets[0]._id, unit: 'unidad' },
        { name: 'Pan Francés', price: 80, categoryId: categories[3]._id, supermarketId: supermarkets[1]._id, unit: 'unidad' },
        { name: 'Coca Cola 2L', price: 180, categoryId: categories[4]._id, supermarketId: supermarkets[1]._id, unit: 'unidad' }
      ];

      await Product.insertMany(products);

      console.log('Datos de ejemplo insertados correctamente');
    }

    // Mantener datos legacy de mockups
    const mockupCount = await Mockup.countDocuments();
    if (mockupCount === 0) {
      await Mockup.insertMany([
        {
          name: 'Home Page',
          description: 'Contenido de la página principal',
          data: { title: 'Bienvenido a Caminando Online', content: 'Tu supermercado a un click' }
        },
        {
          name: 'About',
          description: 'Página de información',
          data: { title: 'Sobre nosotros', content: 'Conectamos supermercados con clientes' }
        }
      ]);
    }
  } catch (error) {
    console.error('Error insertando datos de ejemplo:', error);
  }
};

module.exports = {
  connectDB,
  seedData,
  generateOrderNumber,
  User,
  Address,
  Supermarket,
  Category,
  Product,
  Order,
  ProductReview,
  SupermarketReview,
  Mockup
};
      console.log('Datos de ejemplo insertados');
    }
  } catch (error) {
    console.error('Error insertando datos de ejemplo:', error);
  }
};

module.exports = { connectDB, User, Mockup, seedData };
