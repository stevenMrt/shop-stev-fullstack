import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al resetear contraseña');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>¡Contraseña Actualizada!</h1>
            <p>Tu contraseña ha sido cambiada exitosamente</p>
          </div>
          <div className="auth-footer">
            <Link to="/login">Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Recuperar Contraseña</h1>
          <p>Ingresa tu email y nueva contraseña</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                name="newPassword"
                placeholder="Nueva contraseña"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar nueva contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Recordaste tu contraseña? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;