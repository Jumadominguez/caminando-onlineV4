const mongoose = require('mongoose');

// ===== CONFIGURACIÓN DE BASE DE DATOS DIA =====

// Conexión específica para Dia
const DIA_DB_URI = process.env.DIA_DB_URI || 'mongodb://localhost:27017/db-dia';

// Conexión a base de datos de Dia
let diaConnection = null;

const connectDiaDB = async () => {
  try {
    if (!diaConnection) {
      diaConnection = await mongoose.createConnection(DIA_DB_URI);
      console.log('✅ Conectado a base de datos Dia: db-dia');
    }
    return diaConnection;
  } catch (error) {
    console.error('❌ Error conectando a base de datos Dia:', error);
    throw error;
  }
};

// ===== ESQUEMAS PARA DIA =====

// 1. Esquema para Supermarket (información general del supermercado)
const SupermarketSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Dia' },
  description: { type: String },
  logo: { type: String, default: '🏬' },
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
  deliveryRadius: { type: Number, default: 8 }, // km
  deliveryFee: { type: Number, default: 90 },
  minimumOrder: { type: Number, default: 250 },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  paymentMethods: [{ type: String }],
  features: [{ type: String }],
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
  sortOrder: { type: Number, default: 0 },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
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
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 4. Esquema para ProductTypes (tipos de productos)
const ProductTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 5. Esquema para Subfilters (subfiltros para búsqueda avanzada)
const SubfilterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['brand', 'price_range', 'origin', 'organic', 'dietary'], required: true },
  values: [{ type: String }],
  productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 6. Esquema para Products (productos)
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  shortDescription: { type: String },
  sku: { type: String, required: true, unique: true },
  barcode: { type: String },

  // Precios
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discountPercentage: { type: Number, default: 0 },

  // Categorización
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType', required: true },

  // Imágenes
  images: [{ type: String }],
  mainImage: { type: String },

  // Especificaciones
  brand: { type: String },
  weight: { type: String },
  volume: { type: String },
  unit: { type: String, enum: ['kg', 'g', 'l', 'ml', 'unidad', 'paquete'], default: 'unidad' },
  packageSize: { type: String },

  // Inventario
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 0 },
  maxStock: { type: Number, default: 1000 },
  isAvailable: { type: Boolean, default: true },

  // Estado y promociones
  isActive: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },

  // Información nutricional
  nutritionalInfo: {
    calories: { type: Number },
    proteins: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
    fiber: { type: Number },
    sodium: { type: Number }
  },

  // Etiquetas y filtros
  tags: [{ type: String }],
  allergens: [{ type: String }],
  dietaryRestrictions: [{ type: String }], // vegetariano, vegano, sin gluten, etc.

  // SEO
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: [{ type: String }],

  // Estadísticas
  viewCount: { type: Number, default: 0 },
  purchaseCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== MODELOS PARA DIA =====

// Función para crear modelos con conexión específica
const createDiaModels = async () => {
  const connection = await connectDiaDB();

  return {
    Supermarket: connection.model('Supermarket', SupermarketSchema),
    Category: connection.model('Category', CategorySchema),
    Subcategory: connection.model('Subcategory', SubcategorySchema),
    ProductType: connection.model('ProductType', ProductTypeSchema),
    Subfilter: connection.model('Subfilter', SubfilterSchema),
    Product: connection.model('Product', ProductSchema)
  };
};

// ===== DATOS DE EJEMPLO PARA DIA =====

const seedDiaData = async () => {
  try {
    const models = await createDiaModels();
    const { Supermarket, Category, Subcategory, ProductType, Subfilter, Product } = models;

    console.log('🌱 Insertando datos de ejemplo para Dia...');

    // 1. Información del Supermercado
    const supermarketCount = await Supermarket.countDocuments();
    if (supermarketCount === 0) {
      await Supermarket.create({
        name: 'Dia',
        description: 'Dia - Precios bajos todos los días',
        logo: '🏬',
        address: {
          street: 'Av. Rivadavia',
          number: '2345',
          city: 'Buenos Aires',
          state: 'Buenos Aires',
          zipCode: '1034'
        },
        phone: '+54 11 5678-9012',
        email: 'hola@dia.com.ar',
        website: 'https://www.dia.com.ar',
        deliveryRadius: 8,
        deliveryFee: 90,
        minimumOrder: 250,
        openingHours: {
          monday: { open: '08:00', close: '22:00' },
          tuesday: { open: '08:00', close: '22:00' },
          wednesday: { open: '08:00', close: '22:00' },
          thursday: { open: '08:00', close: '22:00' },
          friday: { open: '08:00', close: '22:00' },
          saturday: { open: '08:00', close: '21:00' },
          sunday: { open: '09:00', close: '20:00' }
        },
        paymentMethods: ['efectivo', 'tarjeta_credito', 'tarjeta_debito', 'dia_card'],
        features: ['precios_bajos', 'entrega_rapida', 'club_dia']
      });
      console.log('✅ Supermercado Dia creado');
    }

    // 2. Categorías principales
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const categories = await Category.insertMany([
        { name: 'Almacén', description: 'Productos de almacén', icon: '🏪', color: '#FF6B6B', sortOrder: 1 },
        { name: 'Frescos', description: 'Productos frescos', icon: '🥕', color: '#4ECDC4', sortOrder: 2 },
        { name: 'Congelados', description: 'Productos congelados', icon: '🧊', color: '#45B7D1', sortOrder: 3 },
        { name: 'Bebidas', description: 'Bebidas y líquidos', icon: '🥤', color: '#96CEB4', sortOrder: 4 },
        { name: 'Limpieza', description: 'Productos de limpieza', icon: '🧹', color: '#FFEAA7', sortOrder: 5 },
        { name: 'Perfumería', description: 'Cuidado personal', icon: '🧴', color: '#DDA0DD', sortOrder: 6 }
      ]);
      console.log('✅ Categorías de Dia creadas');

      // 3. Subcategorías
      const subcategories = await Subcategory.insertMany([
        // Almacén
        { name: 'Arroz y Legumbres', categoryId: categories[0]._id, sortOrder: 1 },
        { name: 'Aceites y Aderezos', categoryId: categories[0]._id, sortOrder: 2 },
        { name: 'Conservas', categoryId: categories[0]._id, sortOrder: 3 },

        // Frescos
        { name: 'Frutas', categoryId: categories[1]._id, sortOrder: 1 },
        { name: 'Verduras', categoryId: categories[1]._id, sortOrder: 2 },
        { name: 'Carnes', categoryId: categories[1]._id, sortOrder: 3 },
        { name: 'Lácteos', categoryId: categories[1]._id, sortOrder: 4 },

        // Bebidas
        { name: 'Gaseosas', categoryId: categories[3]._id, sortOrder: 1 },
        { name: 'Jugos', categoryId: categories[3]._id, sortOrder: 2 },
        { name: 'Aguas', categoryId: categories[3]._id, sortOrder: 3 }
      ]);
      console.log('✅ Subcategorías de Dia creadas');

      // 4. Tipos de productos
      await ProductType.insertMany([
        { name: 'Arroz Blanco', subcategoryId: subcategories[0]._id, sortOrder: 1 },
        { name: 'Lentejas', subcategoryId: subcategories[0]._id, sortOrder: 2 },
        { name: 'Aceite de Oliva', subcategoryId: subcategories[1]._id, sortOrder: 1 },
        { name: 'Vinagre', subcategoryId: subcategories[1]._id, sortOrder: 2 },
        { name: 'Manzanas', subcategoryId: subcategories[3]._id, sortOrder: 1 },
        { name: 'Bananas', subcategoryId: subcategories[3]._id, sortOrder: 2 },
        { name: 'Leche Entera', subcategoryId: subcategories[6]._id, sortOrder: 1 },
        { name: 'Queso Cremoso', subcategoryId: subcategories[6]._id, sortOrder: 2 },
        { name: 'Coca Cola', subcategoryId: subcategories[7]._id, sortOrder: 1 },
        { name: 'Sprite', subcategoryId: subcategories[7]._id, sortOrder: 2 }
      ]);
      console.log('✅ Tipos de productos de Dia creados');
    }

    // 5. Subfiltros
    const subfilterCount = await Subfilter.countDocuments();
    if (subfilterCount === 0) {
      await Subfilter.insertMany([
        { name: 'Marca', type: 'brand', values: ['Dia', 'Cica', 'Luchetti', 'Tres Cruces'] },
        { name: 'Precio', type: 'price_range', values: ['0-50', '51-100', '101-200', '201+'] },
        { name: 'Origen', type: 'origin', values: ['Argentina', 'Brasil', 'Uruguay', 'Chile'] },
        { name: 'Orgánico', type: 'organic', values: ['Sí', 'No'] },
        { name: 'Dietético', type: 'dietary', values: ['Sin Gluten', 'Sin Lactosa', 'Vegano', 'Vegetariano'] }
      ]);
      console.log('✅ Subfiltros de Dia creados');
    }

    // 6. Productos de ejemplo
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const categories = await Category.find();
      const subcategories = await Subcategory.find();
      const productTypes = await ProductType.find();

      await Product.insertMany([
        {
          name: 'Arroz Dia Premium 1kg',
          description: 'Arroz blanco de primera calidad marca Dia',
          shortDescription: 'Arroz blanco premium Dia',
          sku: 'DIA-ARROZ-001',
          price: 145,
          originalPrice: 160,
          discountPercentage: 9,
          categoryId: categories[0]._id,
          subcategoryId: subcategories[0]._id,
          productTypeId: productTypes[0]._id,
          brand: 'Dia',
          weight: '1kg',
          unit: 'paquete',
          stock: 100,
          tags: ['arroz', 'blanco', 'premium', 'dia'],
          seoTitle: 'Arroz Dia Premium 1kg',
          seoDescription: 'Arroz blanco de primera calidad marca Dia',
          seoKeywords: ['arroz', 'dia', 'premium']
        },
        {
          name: 'Manzanas Rojas por kg',
          description: 'Manzanas frescas de estación',
          shortDescription: 'Manzanas rojas frescas',
          sku: 'DIA-MANZANA-001',
          price: 135,
          categoryId: categories[1]._id,
          subcategoryId: subcategories[3]._id,
          productTypeId: productTypes[4]._id,
          unit: 'kg',
          stock: 160,
          tags: ['manzana', 'fruta', 'fresco'],
          nutritionalInfo: {
            calories: 52,
            carbs: 14,
            fiber: 2.4
          }
        },
        {
          name: 'Leche Cica Entera 1L',
          description: 'Leche entera Cica, calidad garantizada',
          shortDescription: 'Leche entera Cica 1L',
          sku: 'DIA-LECHE-001',
          price: 195,
          categoryId: categories[1]._id,
          subcategoryId: subcategories[6]._id,
          productTypeId: productTypes[6]._id,
          brand: 'Cica',
          volume: '1L',
          unit: 'unidad',
          stock: 80,
          tags: ['leche', 'entera', 'cica'],
          nutritionalInfo: {
            calories: 61,
            proteins: 3.3,
            carbs: 4.8,
            fats: 3.3
          }
        },
        {
          name: 'Coca Cola Original 2.25L',
          description: 'Gaseosa Coca Cola botella retornable',
          shortDescription: 'Coca Cola 2.25L',
          sku: 'DIA-COCA-001',
          price: 255,
          categoryId: categories[3]._id,
          subcategoryId: subcategories[7]._id,
          productTypeId: productTypes[8]._id,
          brand: 'Coca Cola',
          volume: '2.25L',
          unit: 'unidad',
          stock: 65,
          tags: ['gaseosa', 'cola', 'refresco']
        }
      ]);
      console.log('✅ Productos de ejemplo de Dia creados');
    }

    console.log('🎉 Datos de ejemplo para Dia insertados correctamente');

  } catch (error) {
    console.error('❌ Error insertando datos de ejemplo para Dia:', error);
  }
};

// ===== FUNCIONES DE UTILIDAD =====

// Obtener estadísticas de la base de datos
const getDiaStats = async () => {
  try {
    const models = await createDiaModels();
    const { Product, Category, Subcategory, ProductType } = models;

    const [
      totalProducts,
      totalCategories,
      totalSubcategories,
      totalProductTypes,
      productsByCategory
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
      Subcategory.countDocuments({ isActive: true }),
      ProductType.countDocuments({ isActive: true }),
      Product.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$categoryId', count: { $sum: 1 } } },
        { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
        { $unwind: '$category' },
        { $project: { name: '$category.name', count: 1 } }
      ])
    ]);

    return {
      totalProducts,
      totalCategories,
      totalSubcategories,
      totalProductTypes,
      productsByCategory
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas de Dia:', error);
    throw error;
  }
};

// Función para buscar productos con filtros
const searchDiaProducts = async (filters = {}) => {
  try {
    const models = await createDiaModels();
    const { Product } = models;

    let query = { isActive: true };

    // Aplicar filtros
    if (filters.categoryId) query.categoryId = filters.categoryId;
    if (filters.subcategoryId) query.subcategoryId = filters.subcategoryId;
    if (filters.productTypeId) query.productTypeId = filters.productTypeId;
    if (filters.brand) query.brand = new RegExp(filters.brand, 'i');
    if (filters.search) {
      query.$or = [
        { name: new RegExp(filters.search, 'i') },
        { description: new RegExp(filters.search, 'i') },
        { tags: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    if (filters.isOnSale) query.isOnSale = true;

    const products = await Product.find(query)
      .populate('categoryId', 'name icon')
      .populate('subcategoryId', 'name')
      .populate('productTypeId', 'name')
      .sort(filters.sort || { createdAt: -1 })
      .limit(filters.limit || 20)
      .skip(filters.skip || 0);

    return products;
  } catch (error) {
    console.error('Error buscando productos en Dia:', error);
    throw error;
  }
};

module.exports = {
  connectDiaDB,
  createDiaModels,
  seedDiaData,
  getDiaStats,
  searchDiaProducts
};
