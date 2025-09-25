const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    title: "iPhone 15 Pro Max 256GB",
    category: "celulares",
    description: "Apple iPhone 15 Pro Max con chip A17 Pro, cámara de 48MP, pantalla Super Retina XDR de 6.7 pulgadas.",
    price: 6200000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    stock: 15,
    rating: { rate: 4.9, count: 320 }
  },
  {
    title: "Samsung Galaxy S24 Ultra 512GB",
    category: "celulares",
    description: "Samsung Galaxy S24 Ultra con S Pen, cámara de 200MP, pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
    price: 5800000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    stock: 12,
    rating: { rate: 4.8, count: 280 }
  },
  {
    title: "MacBook Pro 14 M3 Pro 512GB",
    category: "computadores",
    description: "Apple MacBook Pro 14 pulgadas con chip M3 Pro, 18GB RAM, 512GB SSD, pantalla Liquid Retina XDR.",
    price: 9800000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    stock: 8,
    rating: { rate: 4.9, count: 250 }
  },
  {
    title: "Dell XPS 15 OLED i7 32GB",
    category: "computadores",
    description: "Dell XPS 15 con Intel Core i7-13700H, 32GB RAM, 1TB SSD, pantalla OLED 4K, RTX 4060.",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    stock: 6,
    rating: { rate: 4.7, count: 180 }
  },
  {
    title: "PlayStation 5 Slim 1TB",
    category: "playstation",
    description: "Sony PlayStation 5 Slim con 1TB SSD, control DualSense inalámbrico, ray tracing, 4K gaming.",
    price: 2600000,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    stock: 20,
    rating: { rate: 4.8, count: 400 }
  },
  {
    title: "AirPods Pro 2da Generación USB-C",
    category: "accesorios",
    description: "Apple AirPods Pro 2da generación con cancelación activa de ruido, audio espacial, estuche USB-C.",
    price: 1100000,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    stock: 25,
    rating: { rate: 4.8, count: 300 }
  },
  {
    title: "Marvel's Spider-Man 2 PS5",
    category: "juegos",
    description: "Marvel's Spider-Man 2 para PlayStation 5, aventura de acción con Peter Parker y Miles Morales.",
    price: 320000,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400",
    stock: 30,
    rating: { rate: 4.9, count: 500 }
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    await Product.deleteMany({});
    console.log('Productos anteriores eliminados');
    
    await Product.insertMany(products);
    console.log('Productos insertados exitosamente');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedProducts();