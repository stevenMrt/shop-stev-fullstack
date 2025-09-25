import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from '../backend/routes/auth.js';
import productsRoutes from '../backend/routes/products.js';
import cartRoutes from '../backend/routes/cart.js';
import ordersRoutes from '../backend/routes/orders.js';
import favoritesRoutes from '../backend/routes/favorites.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI);
}

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/favorites', favoritesRoutes);

// Handler para Vercel
export default (req, res) => {
  return app(req, res);
};