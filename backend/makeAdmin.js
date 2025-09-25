const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Mostrar todos los usuarios
    const users = await User.find().select('name email role');
    console.log('\n=== USUARIOS REGISTRADOS ===');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Rol: ${user.role}`);
    });
    
    // Hacer admin a Steven
    const steven = await User.findOne({ email: 'stevenmartinezh2@gmail.com' });
    if (steven) {
      await User.findByIdAndUpdate(steven._id, { role: 'admin' });
      console.log(`\n✅ ${steven.name} ahora es ADMINISTRADOR`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

makeAdmin();