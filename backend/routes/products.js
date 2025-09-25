const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, sortBy, search } = req.query;
    
    let filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (minRating) {
      filter['rating.rate'] = { $gte: Number(minRating) };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Product.find(filter);
    
    // Ordenamiento
    switch (sortBy) {
      case 'price-low':
        query = query.sort({ price: 1 });
        break;
      case 'price-high':
        query = query.sort({ price: -1 });
        break;
      case 'rating':
        query = query.sort({ 'rating.rate': -1 });
        break;
      case 'name':
        query = query.sort({ title: 1 });
        break;
      default:
        query = query.sort({ createdAt: -1 });
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Agregar reseña
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      title,
      comment
    };

    product.reviews.push(review);
    product.calculateAverageRating();
    await product.save();

    res.status(201).json({ message: 'Reseña agregada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;