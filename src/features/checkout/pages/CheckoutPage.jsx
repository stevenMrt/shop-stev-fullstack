import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaLock, FaCheck, FaUniversity, FaMobile } from 'react-icons/fa';

const CheckoutPage = ({ cartItems, total, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [orderData, setOrderData] = useState({
    shipping: { name: '', address: '', department: '', city: '', phone: '' },
    payment: { method: 'card', cardNumber: '', expiry: '', cvv: '' }
  });

  const colombiaData = {
    'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Turbo', 'Rionegro'],
    'Bogotá D.C.': ['Bogotá'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Cartago', 'Buga'],
    'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Puerto Colombia'],
    'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja'],
    'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'El Carmen de Bolívar'],
    'Cundinamarca': ['Soacha', 'Facatativá', 'Zipaquirá', 'Chía', 'Mosquera', 'Fusagasugá'],
    'Norte de Santander': ['Cúcuta', 'Villa del Rosario', 'Los Patios', 'Ocaña', 'Pamplona'],
    'Córdoba': ['Montería', 'Lorica', 'Cereté', 'Sahagún', 'Planeta Rica'],
    'Tolima': ['Ibagué', 'Espinal', 'Melgar', 'Honda', 'Líbano'],
    'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre'],
    'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia'],
    'Caldas': ['Manizales', 'Villamaría', 'Chinchiná', 'La Dorada'],
    'Quindío': ['Armenia', 'Calarcá', 'Montenegro', 'La Tebaida'],
    'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco'],
    'Meta': ['Villavicencio', 'Acacías', 'Granada', 'San Martín'],
    'Nariño': ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres'],
    'Cesar': ['Valledupar', 'Aguachica', 'Bosconia', 'Codazzi'],
    'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'],
    'La Guajira': ['Riohacha', 'Maicao', 'Fonseca', 'San Juan del Cesar'],
    'Sucre': ['Sincelejo', 'Corozal', 'Sampués', 'San Marcos'],
    'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'],
    'Casanare': ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena'],
    'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Puerto Rico'],
    'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito'],
    'Arauca': ['Arauca', 'Tame', 'Saravena'],
    'Amazonas': ['Leticia', 'Puerto Nariño'],
    'Guainía': ['Inírida'],
    'Guaviare': ['San José del Guaviare'],
    'Vaupés': ['Mitú'],
    'Vichada': ['Puerto Carreño']
  };

  const handleOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Confirmado'
    };
    localStorage.setItem('shop-stev-orders', JSON.stringify([order]));
    onOrderComplete();
    setStep(3);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Envío</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Pago</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirmación</div>
        </div>

        {step === 1 && (
          <div className="checkout-step">
            <h2>Información de Envío</h2>
            <div className="form-row">
              <input placeholder="Nombre completo" />
              <input placeholder="Teléfono" />
            </div>
            <input placeholder="Dirección completa" />
            <div className="form-row">
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="department-select"
              >
                <option value="">Seleccionar departamento</option>
                {Object.keys(colombiaData).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select className="city-select" disabled={!selectedDepartment}>
                <option value="">Seleccionar ciudad</option>
                {selectedDepartment && colombiaData[selectedDepartment].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button 
              className="next-btn" 
              onClick={() => setStep(2)}
              disabled={!selectedDepartment}
            >
              Continuar al Pago
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="checkout-step">
            <h2>Método de Pago</h2>
            <div className="payment-methods">
              <div 
                className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('card')}
              >
                <FaCreditCard /> Tarjeta de Crédito
              </div>
              <div 
                className={`payment-option ${selectedPayment === 'pse' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('pse')}
              >
                <FaUniversity /> PSE
              </div>
              <div 
                className={`payment-option ${selectedPayment === 'nequi' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('nequi')}
              >
                <FaMobile /> Nequi
              </div>
              <div 
                className={`payment-option ${selectedPayment === 'daviplata' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('daviplata')}
              >
                <FaMobile /> DaviPlata
              </div>
            </div>
            
            {selectedPayment === 'pse' && (
              <div className="bank-selector">
                <label>Selecciona tu banco:</label>
                <select 
                  className="bank-select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="">Seleccionar banco</option>
                  <option value="bancolombia">Bancolombia</option>
                  <option value="davivienda">Banco Davivienda</option>
                  <option value="bogota">Banco de Bogotá</option>
                  <option value="bbva">BBVA Colombia</option>
                  <option value="popular">Banco Popular</option>
                  <option value="occidente">Banco de Occidente</option>
                  <option value="av_villas">Banco AV Villas</option>
                  <option value="colpatria">Scotiabank Colpatria</option>
                  <option value="caja_social">Banco Caja Social</option>
                  <option value="agrario">Banco Agrario</option>
                </select>
                
                {selectedBank === 'bancolombia' && (
                  <div className="bank-form">
                    <input type="text" placeholder="Número de documento" />
                    <input type="password" placeholder="Clave de internet" />
                    <p className="bank-note">🏦 Serás redirigido a Bancolombia en Línea</p>
                  </div>
                )}
                
                {selectedBank === 'davivienda' && (
                  <div className="bank-form">
                    <input type="text" placeholder="Usuario Davivienda" />
                    <input type="password" placeholder="Clave" />
                    <p className="bank-note">🏦 Acceso a Davivienda Virtual</p>
                  </div>
                )}
                
                {selectedBank === 'bogota' && (
                  <div className="bank-form">
                    <input type="text" placeholder="Número de tarjeta débito" />
                    <input type="password" placeholder="Clave" />
                    <p className="bank-note">🏦 Portal Banco de Bogotá</p>
                  </div>
                )}
                
                {selectedBank === 'bbva' && (
                  <div className="bank-form">
                    <input type="text" placeholder="Número de documento" />
                    <input type="password" placeholder="Clave BBVA Net Cash" />
                    <p className="bank-note">🏦 BBVA Net Cash</p>
                  </div>
                )}
                
                {selectedBank === 'popular' && (
                  <div className="bank-form">
                    <input type="text" placeholder="Usuario" />
                    <input type="password" placeholder="Contraseña" />
                    <p className="bank-note">🏦 Banca Virtual Popular</p>
                  </div>
                )}
                
                {(selectedBank && !['bancolombia', 'davivienda', 'bogota', 'bbva', 'popular'].includes(selectedBank)) && (
                  <div className="bank-form">
                    <input type="text" placeholder="Usuario" />
                    <input type="password" placeholder="Contraseña" />
                    <p className="bank-note">🏦 Serás redirigido al portal de tu banco</p>
                  </div>
                )}
              </div>
            )}
            
            {(selectedPayment === 'nequi' || selectedPayment === 'daviplata') && (
              <div className="mobile-payment">
                <input 
                  type="tel" 
                  placeholder="Número de celular" 
                  className="mobile-input"
                />
                <p className="payment-note">
                  📱 Recibirás una notificación en tu app para confirmar el pago
                </p>
              </div>
            )}
            {selectedPayment === 'card' && (
              <div className="form-row">
                <input placeholder="Número de tarjeta" />
                <input placeholder="MM/AA" />
                <input placeholder="CVV" />
              </div>
            )}
            <div className="order-summary">
              <h3>Resumen del Pedido</h3>
              <div className="total">Total: ${total.toFixed(2)}</div>
            </div>
            <button className="order-btn" onClick={handleOrder}>
              <FaLock /> Confirmar Pedido
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="checkout-step success">
            <div className="success-animation">
              <div className="check-circle">
                <FaCheck className="success-icon" />
              </div>
            </div>
            <h2>¡Pedido Confirmado!</h2>
            <p className="success-message">Tu pedido ha sido procesado exitosamente</p>
            
            <div className="order-details">
              <div className="order-info">
                <h3>Detalles del Pedido</h3>
                <div className="detail-row">
                  <span>Número de pedido:</span>
                  <span className="order-number">#{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="detail-row">
                  <span>Total pagado:</span>
                  <span className="order-total">${total.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span>Método de pago:</span>
                  <span className="payment-method">
                    {selectedPayment === 'card' && 'Tarjeta de Crédito'}
                    {selectedPayment === 'pse' && `PSE - ${selectedBank}`}
                    {selectedPayment === 'nequi' && 'Nequi'}
                    {selectedPayment === 'daviplata' && 'DaviPlata'}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Fecha:</span>
                  <span>{new Date().toLocaleDateString('es-CO')}</span>
                </div>
              </div>
              
              <div className="delivery-info">
                <h3>Información de Entrega</h3>
                <p>🚚 Tiempo estimado: 3-5 días hábiles</p>
                <p>📧 Recibirás un email de confirmación</p>
                <p>📱 Te notificaremos cuando esté en camino</p>
              </div>
            </div>
            
            <div className="success-actions">
              <button className="btn-primary" onClick={() => window.location.href = '/'}>
                Seguir Comprando
              </button>
              <button className="btn-secondary" onClick={() => window.print()}>
                Imprimir Recibo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;