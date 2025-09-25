const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener carrito del usuario
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Agregar producto al carrito
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    const user = await User.findById(req.user._id);
    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar cantidad en carrito
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Producto no encontrado en carrito' });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(item => item.product.toString() !== productId);
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar producto del carrito
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
    
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Limpiar carrito
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;