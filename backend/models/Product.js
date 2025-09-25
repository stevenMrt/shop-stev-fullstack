const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['celulares', 'computadores', 'accesorios', 'playstation', 'juegos']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  rating: {
    rate: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [reviewSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calcular rating promedio
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.rate = 0;
    this.rating.count = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.rate = totalRating / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
};

module.exports = mongoose.model('Product', productSchema);