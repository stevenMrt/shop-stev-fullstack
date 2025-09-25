const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Crear nuevo usuario admin
    const adminData = {
      name: 'Steven David',
      email: 'admin@shopstev.com',
      password: 'stev1213',
      role: 'admin'
    };
    
    // Verificar si ya existe
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('❌ Ya existe un admin con ese email');
      process.exit(1);
    }
    
    // Crear nuevo admin
    const admin = new User(adminData);
    await admin.save();
    
    console.log('✅ Nuevo administrador creado:');
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Contraseña: ${adminData.password}`);
    console.log(`👑 Rol: ${adminData.role}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();