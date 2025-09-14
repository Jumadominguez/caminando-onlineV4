const express = require('express');
const {
  User,
  Address,
  Supermarket,
  Category,
  Product,
  Order,
  ProductReview,
  SupermarketReview,
  Mockup,
  generateOrderNumber
} = require('../models/database');

const router = express.Router();

// ===== ENDPOINTS LEGACY (MANTENER COMPATIBILIDAD) =====

// Endpoint básico para mockups desde MongoDB
router.get('/mockups', async (req, res) => {
  try {
    const mockups = await Mockup.find();
    res.json({ data: mockups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para datos de la página principal
router.get('/home', async (req, res) => {
  try {
    const homeData = await Mockup.findOne({ name: 'Home Page' });
    if (homeData) {
      res.json(homeData.data);
    } else {
      res.json({
        title: 'Bienvenido a Caminando Online',
        content: 'Tu supermercado a un click',
        features: [
          'Entrega rápida',
          'Precios competitivos',
          'Amplia variedad'
        ]
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE SUPERMERCADOS =====

// Obtener todos los supermercados activos
router.get('/supermarkets', async (req, res) => {
  try {
    const supermarkets = await Supermarket.find({ isActive: true })
      .select('name logo description address deliveryFee minimumOrder')
      .sort({ name: 1 });
    res.json({ data: supermarkets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un supermercado específico
router.get('/supermarkets/:id', async (req, res) => {
  try {
    const supermarket = await Supermarket.findById(req.params.id);
    if (!supermarket) {
      return res.status(404).json({ error: 'Supermercado no encontrado' });
    }
    res.json({ data: supermarket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE CATEGORÍAS =====

// Obtener todas las categorías activas
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select('name description icon')
      .sort({ name: 1 });
    res.json({ data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE PRODUCTOS =====

// Obtener productos por supermercado y categoría
router.get('/products', async (req, res) => {
  try {
    const { supermarketId, categoryId, search, page = 1, limit = 20 } = req.query;

    let query = { isActive: true };

    if (supermarketId) query.supermarketId = supermarketId;
    if (categoryId) query.categoryId = categoryId;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('categoryId', 'name icon')
      .populate('supermarketId', 'name logo')
      .select('name description price originalPrice image unit stock isOnSale tags')
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto específico
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name description icon')
      .populate('supermarketId', 'name logo description address');

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE USUARIOS =====

// Obtener perfil de usuario (requiere autenticación)
router.get('/users/profile', async (req, res) => {
  try {
    // En un sistema real, obtendríamos el userId del token JWT
    const userId = req.query.userId || '507f1f77bcf86cd799439011'; // Mock userId

    const user = await User.findById(userId)
      .select('username email firstName lastName phone role createdAt');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener direcciones de usuario
router.get('/users/:userId/addresses', async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId })
      .sort({ isDefault: -1, createdAt: -1 });

    res.json({ data: addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE PEDIDOS =====

// Crear un nuevo pedido
router.post('/orders', async (req, res) => {
  try {
    const {
      userId,
      supermarketId,
      items,
      deliveryAddress,
      paymentMethod,
      deliveryNotes
    } = req.body;

    // Calcular totales
    let subtotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Producto ${item.productId} no encontrado` });
      }
      item.price = product.price;
      item.total = item.quantity * product.price;
      subtotal += item.total;
    }

    // Obtener tarifa de delivery del supermercado
    const supermarket = await Supermarket.findById(supermarketId);
    const deliveryFee = supermarket.deliveryFee || 0;

    const total = subtotal + deliveryFee;

    // Crear pedido
    const order = new Order({
      orderNumber: generateOrderNumber(),
      userId,
      supermarketId,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      deliveryAddress,
      deliveryNotes
    });

    await order.save();

    res.status(201).json({
      data: order,
      message: 'Pedido creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener pedidos de un usuario
router.get('/users/:userId/orders', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { userId: req.params.userId };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('supermarketId', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido específico
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('supermarketId', 'name logo address phone')
      .populate('items.productId', 'name image unit');

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de pedido
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedAt: new Date(),
        ...(status === 'delivered' && { actualDeliveryTime: new Date() })
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({
      data: order,
      message: 'Estado del pedido actualizado'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE REVIEWS =====

// Obtener reviews de un producto
router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await ProductReview.find({ productId: req.params.productId })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ProductReview.countDocuments({ productId: req.params.productId });
    const averageRating = await ProductReview.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(req.params.productId) } },
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);

    res.json({
      data: reviews,
      stats: {
        total,
        averageRating: averageRating[0]?.average || 0
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear review de producto
router.post('/products/:productId/reviews', async (req, res) => {
  try {
    const { userId, orderId, rating, comment } = req.body;

    const review = new ProductReview({
      userId,
      productId: req.params.productId,
      orderId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      data: review,
      message: 'Review creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reviews de un supermercado
router.get('/supermarkets/:supermarketId/reviews', async (req, res) => {
  try {
    const reviews = await SupermarketReview.find({ supermarketId: req.params.supermarketId })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 });

    const stats = await SupermarketReview.aggregate([
      { $match: { supermarketId: mongoose.Types.ObjectId(req.params.supermarketId) } },
      {
        $group: {
          _id: null,
          average: { $avg: '$rating' },
          deliveryAvg: { $avg: '$aspects.delivery' },
          qualityAvg: { $avg: '$aspects.productQuality' },
          serviceAvg: { $avg: '$aspects.service' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      data: reviews,
      stats: stats[0] || { average: 0, deliveryAvg: 0, qualityAvg: 0, serviceAvg: 0, count: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ENDPOINTS DE ESTADÍSTICAS =====

// Obtener estadísticas generales (para admin)
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalSupermarkets,
      recentOrders
    ] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Supermarket.countDocuments({ isActive: true }),
      Order.find()
        .populate('userId', 'firstName lastName')
        .populate('supermarketId', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const revenue = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'ready', 'delivering'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    res.json({
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalSupermarkets,
        totalRevenue: revenue[0]?.total || 0,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
