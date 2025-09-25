import React from 'react';
import { Link } from 'react-router-dom';
import DisabledFeature from '../../../components/DisabledFeature';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <DisabledFeature feature="Login" />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '16px'
        }}>
          ← Volver al Catálogo
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;