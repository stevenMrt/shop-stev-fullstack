const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Mostrar todos los usuarios
    const users = await User.find().select('name email');
    console.log('\n=== USUARIOS REGISTRADOS ===');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
    });
    
    // Cambiar aquí el email del usuario y la nueva contraseña
    const EMAIL_TO_RESET = 'stevenmartinezh2@gmail.com'; // ⬅️ CAMBIA ESTE EMAIL
    const NEW_PASSWORD = '123456'; // ⬅️ CAMBIA ESTA CONTRASEÑA
    
    const user = await User.findOne({ email: EMAIL_TO_RESET });
    
    if (!user) {
      console.log(`❌ No se encontró usuario con email: ${EMAIL_TO_RESET}`);
      process.exit(1);
    }
    
    // Actualizar contraseña (se encripta automáticamente por el middleware)
    user.password = NEW_PASSWORD;
    await user.save();
    
    console.log(`\n✅ Contraseña actualizada para: ${user.name} (${user.email})`);
    console.log(`🔑 Nueva contraseña: ${NEW_PASSWORD}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetPassword();