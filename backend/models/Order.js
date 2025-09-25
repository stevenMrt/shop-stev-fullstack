const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingInfo: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['card', 'pse', 'nequi', 'daviplata']
    },
    bank: String,
    phone: String
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Generar número de orden único
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = Date.now().toString().slice(-6);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);