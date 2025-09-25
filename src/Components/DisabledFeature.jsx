import React from 'react';

const DisabledFeature = ({ feature }) => {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>🚧 Función en Desarrollo</h3>
      <p>La función de <strong>{feature}</strong> estará disponible próximamente.</p>
      <p>Por ahora puedes explorar nuestro catálogo de productos.</p>
    </div>
  );
};

export default DisabledFeature;