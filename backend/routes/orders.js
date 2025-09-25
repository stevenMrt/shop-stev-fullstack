const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Crear pedido
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shippingInfo, paymentInfo, total } = req.body;
    
    // Verificar stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Stock insuficiente para ${product?.title || 'producto'}` 
        });
      }
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingInfo,
      paymentInfo,
      total
    });

    await order.save();

    // Actualizar stock y limpiar carrito
    for (let item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    await order.populate('items.product');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener pedidos del usuario
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener pedido por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;