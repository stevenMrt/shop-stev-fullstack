const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Recuperar contraseña
router.post('/reset', [
  body('email').isEmail().withMessage('Email inválido'),
  body('newPassword').isLength({ min: 6 }).withMessage('Contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;