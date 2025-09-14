const mongoose = require('mongoose');

// ===== CONFIGURACIÓN DE BASE DE DATOS CARREFOUR =====

// Conexión específica para Carrefour
const CARREFOUR_DB_URI = process.env.CARREFOUR_DB_URI || 'mongodb://localhost:27017/db-carrefour';

// Conexión a base de datos de Carrefour
let carrefourConnection = null;

const connectCarrefourDB = async () => {
  try {
    if (!carrefourConnection) {
      carrefourConnection = await mongoose.createConnection(CARREFOUR_DB_URI);
      console.log('✅ Conectado a base de datos Carrefour: db-carrefour');
    }
    return carrefourConnection;
  } catch (error) {
    console.error('❌ Error conectando a base de datos Carrefour:', error);
    throw error;
  }
};

// ===== ESQUEMAS PARA CARREFOUR =====

// 1. Esquema para Supermarket (información general del supermercado)
const SupermarketSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Carrefour' },
  description: { type: String },
  logo: { type: String, default: '🏪' },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'Argentina' }
  },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  isActive: { type: Boolean, default: true },
  deliveryRadius: { type: Number, default: 15 }, // km
  deliveryFee: { type: Number, default: 150 },
  minimumOrder: { type: Number, default: 500 },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  paymentMethods: [{ type: String }], // efectivo, tarjeta, etc.
  features: [{ type: String }], // delivery, pickup, etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 2. Esquema para Categories (categorías principales)
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  image: { type: String },
  color: { type: String },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 3. Esquema para Subcategories (subcategorías)
const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  icon: { type: String },
  image: { type: String },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 4. Esquema para ProductTypes (tipos de productos)
const ProductTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  attributes: [{
    name: { type: String, required: true }, // peso, volumen, tamaño, etc.
    type: { type: String, enum: ['number', 'string', 'boolean'], default: 'string' },
    unit: { type: String }, // kg, ml, unidades, etc.
    required: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 5. Esquema para Subfilters (subfiltros para búsqueda avanzada)
const SubfilterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['brand', 'price_range', 'origin', 'organic', 'dietary'], required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  values: [{ type: String }], // valores disponibles para el filtro
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 6. Esquema para Products (productos)
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // precio sin descuento
  discountPercentage: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
  images: [{ type: String }], // array de URLs de imágenes
  mainImage: { type: String },
  barcode: { type: String },
  sku: { type: String },
  brand: { type: String },
  weight: { type: Number }, // en gramos
  volume: { type: Number }, // en ml
  unit: { type: String, enum: ['kg', 'unidad', 'litro', 'paquete', 'botella'], default: 'unidad' },
  packageSize: { type: String }, // "500g", "1.5L", etc.
  stock: { type: Number, default: 0 },
  minimumStock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  tags: [{ type: String }], // orgánico, sin gluten, vegano, etc.
  allergens: [{ type: String }], // gluten, lactosa, etc.
  nutritionalInfo: {
    calories: { type: Number },
    proteins: { type: Number }, // en gramos
    carbs: { type: Number }, // en gramos
    fats: { type: Number }, // en gramos
    fiber: { type: Number }, // en gramos
    sugar: { type: Number }, // en gramos
    sodium: { type: Number } // en mg
  },
  ingredients: [{ type: String }],
  origin: { type: String }, // país de origen
  shelfLife: { type: Number }, // días de vida útil
  storageInstructions: { type: String },
  subfilters: [{
    subfilterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subfilter' },
    value: { type: String }
  }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS =====

// Variables para almacenar los modelos
let CarrefourSupermarket,
    CarrefourCategory,
    CarrefourSubcategory,
    CarrefourProductType,
    CarrefourSubfilter,
    CarrefourProduct;

// Función para inicializar modelos de Carrefour
const initializeCarrefourModels = async () => {
  try {
    const conn = await connectCarrefourDB();

    CarrefourSupermarket = conn.model('Supermarket', SupermarketSchema);
    CarrefourCategory = conn.model('Category', CategorySchema);
    CarrefourSubcategory = conn.model('Subcategory', SubcategorySchema);
    CarrefourProductType = conn.model('ProductType', ProductTypeSchema);
    CarrefourSubfilter = conn.model('Subfilter', SubfilterSchema);
    CarrefourProduct = conn.model('Product', ProductSchema);

    console.log('✅ Modelos de Carrefour inicializados correctamente');
  } catch (error) {
    console.error('❌ Error inicializando modelos de Carrefour:', error);
    throw error;
  }
};

// ===== DATOS DE EJEMPLO PARA CARREFOUR =====

const seedCarrefourData = async () => {
  try {
    console.log('🌱 Insertando datos de ejemplo para Carrefour...');

    // 1. Información del Supermercado
    const supermarketData = {
      name: 'Carrefour',
      description: 'Supermercado líder en Argentina con más de 500 sucursales',
      logo: '🏪',
      address: {
        street: 'Av. Corrientes',
        number: '1234',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        zipCode: '1000'
      },
      phone: '+54 11 1234-5678',
      email: 'contacto@carrefour.com.ar',
      website: 'https://www.carrefour.com.ar',
      deliveryRadius: 15,
      deliveryFee: 150,
      minimumOrder: 500,
      openingHours: {
        monday: { open: '08:00', close: '22:00' },
        tuesday: { open: '08:00', close: '22:00' },
        wednesday: { open: '08:00', close: '22:00' },
        thursday: { open: '08:00', close: '22:00' },
        friday: { open: '08:00', close: '22:00' },
        saturday: { open: '08:00', close: '22:00' },
        sunday: { open: '09:00', close: '21:00' }
      },
      paymentMethods: ['efectivo', 'tarjeta_credito', 'tarjeta_debito', 'mercado_pago'],
      features: ['delivery', 'pickup', 'drive_thru']
    };

    // 2. Categorías principales
    const categoriesData = [
      {
        name: 'Alimentos',
        description: 'Productos alimenticios frescos y envasados',
        icon: '🥕',
        color: '#4CAF50',
        displayOrder: 1
      },
      {
        name: 'Bebidas',
        description: 'Bebidas alcoholicas y no alcoholicas',
        icon: '🥤',
        color: '#2196F3',
        displayOrder: 2
      },
      {
        name: 'Limpieza',
        description: 'Productos de limpieza y hogar',
        icon: '🧹',
        color: '#FF9800',
        displayOrder: 3
      },
      {
        name: 'Perfumería',
        description: 'Cuidado personal y perfumería',
        icon: '🧴',
        color: '#E91E63',
        displayOrder: 4
      }
    ];

    // 3. Subcategorías
    const subcategoriesData = [
      // Para Alimentos
      { name: 'Frutas y Verduras', categoryName: 'Alimentos', icon: '🥕' },
      { name: 'Carnes y Pescados', categoryName: 'Alimentos', icon: '🥩' },
      { name: 'Lácteos', categoryName: 'Alimentos', icon: '🥛' },
      { name: 'Panadería', categoryName: 'Alimentos', icon: '🍞' },
      // Para Bebidas
      { name: 'Gaseosas', categoryName: 'Bebidas', icon: '🥤' },
      { name: 'Jugos', categoryName: 'Bebidas', icon: '🧃' },
      { name: 'Cervezas', categoryName: 'Bebidas', icon: '🍺' },
      // Para Limpieza
      { name: 'Detergentes', categoryName: 'Limpieza', icon: '🧺' },
      { name: 'Desinfectantes', categoryName: 'Limpieza', icon: '🧴' }
    ];

    // 4. Tipos de productos
    const productTypesData = [
      { name: 'Fruta Fresca', categoryName: 'Alimentos', subcategoryName: 'Frutas y Verduras' },
      { name: 'Verdura Fresca', categoryName: 'Alimentos', subcategoryName: 'Frutas y Verduras' },
      { name: 'Carne Roja', categoryName: 'Alimentos', subcategoryName: 'Carnes y Pescados' },
      { name: 'Pescado Fresco', categoryName: 'Alimentos', subcategoryName: 'Carnes y Pescados' },
      { name: 'Leche Entera', categoryName: 'Alimentos', subcategoryName: 'Lácteos' },
      { name: 'Yogur', categoryName: 'Alimentos', subcategoryName: 'Lácteos' }
    ];

    // 5. Subfiltros
    const subfiltersData = [
      { name: 'Marca', type: 'brand', values: ['Carrefour', 'La Serenísima', 'Sancor', 'Ilolay'] },
      { name: 'Precio', type: 'price_range', values: ['0-50', '51-100', '101-200', '201+'] },
      { name: 'Origen', type: 'origin', values: ['Argentina', 'Brasil', 'Uruguay', 'Chile'] },
      { name: 'Orgánico', type: 'organic', values: ['Sí', 'No'] },
      { name: 'Dietético', type: 'dietary', values: ['Sin Gluten', 'Sin Lactosa', 'Vegano', 'Sin Azúcar'] }
    ];

    // Insertar datos
    const supermarket = await CarrefourSupermarket.create(supermarketData);
    console.log('✅ Supermercado Carrefour creado');

    const categories = await CarrefourCategory.insertMany(categoriesData);
    console.log('✅ Categorías creadas');

    // Crear subcategorías con referencias a categorías
    const subcategoriesWithRefs = subcategoriesData.map(sub => ({
      ...sub,
      categoryId: categories.find(cat => cat.name === sub.categoryName)._id
    }));
    delete subcategoriesWithRefs.forEach(sub => delete sub.categoryName);

    const subcategories = await CarrefourSubcategory.insertMany(subcategoriesWithRefs);
    console.log('✅ Subcategorías creadas');

    // Actualizar categorías con referencias a subcategorías
    for (const category of categories) {
      const categorySubs = subcategories.filter(sub =>
        sub.categoryId.toString() === category._id.toString()
      );
      await CarrefourCategory.findByIdAndUpdate(category._id, {
        subcategories: categorySubs.map(sub => sub._id)
      });
    }

    // Crear tipos de productos
    const productTypesWithRefs = productTypesData.map(type => {
      const category = categories.find(cat => cat.name === type.categoryName);
      const subcategory = subcategories.find(sub => sub.name === type.subcategoryName);
      return {
        ...type,
        categoryId: category._id,
        subcategoryId: subcategory ? subcategory._id : null
      };
    });
    productTypesWithRefs.forEach(type => {
      delete type.categoryName;
      delete type.subcategoryName;
    });

    const productTypes = await CarrefourProductType.insertMany(productTypesWithRefs);
    console.log('✅ Tipos de productos creados');

    const subfilters = await CarrefourSubfilter.insertMany(subfiltersData);
    console.log('✅ Subfiltros creados');

    // 6. Productos de ejemplo
    const productsData = [
      {
        name: 'Manzanas Rojas',
        description: 'Manzanas rojas frescas de excelente calidad',
        price: 150,
        categoryId: categories[0]._id,
        subcategoryId: subcategories[0]._id,
        productTypeId: productTypes[0]._id,
        brand: 'Carrefour',
        unit: 'kg',
        packageSize: '1kg',
        stock: 100,
        tags: ['fresco', 'natural'],
        origin: 'Argentina',
        nutritionalInfo: {
          calories: 52,
          carbs: 14,
          fiber: 2.4
        }
      },
      {
        name: 'Leche Entera La Serenísima',
        description: 'Leche entera pasteurizada',
        price: 200,
        categoryId: categories[0]._id,
        subcategoryId: subcategories[2]._id,
        productTypeId: productTypes[4]._id,
        brand: 'La Serenísima',
        unit: 'unidad',
        packageSize: '1L',
        stock: 50,
        tags: ['lácteo', 'refrigerado'],
        origin: 'Argentina',
        nutritionalInfo: {
          calories: 61,
          proteins: 3.3,
          carbs: 4.6,
          fats: 3.3
        }
      },
      {
        name: 'Coca Cola 2.25L',
        description: 'Gaseosa Coca Cola botella 2.25 litros',
        price: 350,
        categoryId: categories[1]._id,
        subcategoryId: subcategories[4]._id,
        brand: 'Coca Cola',
        unit: 'unidad',
        packageSize: '2.25L',
        stock: 75,
        tags: ['gaseosa', 'refresco'],
        origin: 'Argentina'
      }
    ];

    const products = await CarrefourProduct.insertMany(productsData);
    console.log('✅ Productos de ejemplo creados');

    console.log('🎉 Base de datos Carrefour inicializada correctamente');

  } catch (error) {
    console.error('❌ Error insertando datos de Carrefour:', error);
  }
};

// ===== FUNCIONES DE UTILIDAD =====

// Obtener todos los modelos de Carrefour
const getCarrefourModels = () => ({
  Supermarket: CarrefourSupermarket,
  Category: CarrefourCategory,
  Subcategory: CarrefourSubcategory,
  ProductType: CarrefourProductType,
  Subfilter: CarrefourSubfilter,
  Product: CarrefourProduct
});

// Función principal para inicializar todo
const initializeCarrefourDB = async () => {
  try {
    await initializeCarrefourModels();
    await seedCarrefourData();
    console.log('🎉 Base de datos Carrefour completamente inicializada');
  } catch (error) {
    console.error('❌ Error inicializando base de datos Carrefour:', error);
    throw error;
  }
};

module.exports = {
  connectCarrefourDB,
  initializeCarrefourModels,
  seedCarrefourData,
  initializeCarrefourDB,
  getCarrefourModels,
  CARREFOUR_DB_URI
};
