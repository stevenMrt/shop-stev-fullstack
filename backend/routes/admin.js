const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Middleware para verificar admin
const adminAuth = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
  }
  next();
};

// Dashboard stats
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Gestión de productos
router.get('/products', auth, adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/products', auth, adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.put('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.delete('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Gestión de usuarios
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Gestión de pedidos
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'title')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.put('/orders/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('user', 'name email');
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;