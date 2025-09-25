const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener favoritos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Agregar/quitar de favoritos
router.post('/toggle', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const user = await User.findById(req.user._id);
    const isFavorite = user.favorites.includes(productId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(id => id.toString() !== productId);
    } else {
      user.favorites.push(productId);
    }

    await user.save();
    await user.populate('favorites');
    
    res.json({
      favorites: user.favorites,
      message: isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;