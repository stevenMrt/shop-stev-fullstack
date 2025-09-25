import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../../../services/api';
import { FaBox, FaCalendar, FaCreditCard, FaTruck } from 'react-icons/fa';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getMyOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#fbbf24',
      confirmed: '#10b981',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#059669',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando historial de pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={loadOrders}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Historial de Pedidos</h1>
        <p>Revisa todos tus pedidos y su estado actual</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <FaBox className="no-orders-icon" />
          <h3>No tienes pedidos aún</h3>
          <p>Cuando realices tu primera compra, aparecerá aquí</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Pedido #{order.orderNumber}</h3>
                  <div className="order-meta">
                    <span className="order-date">
                      <FaCalendar /> {new Date(order.createdAt).toLocaleDateString('es-CO')}
                    </span>
                    <span 
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      <FaTruck /> {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                <div className="order-total">
                  ${order.total.toLocaleString()}
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item._id} className="order-item">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="item-image"
                    />
                    <div className="item-info">
                      <h4>{item.product.title}</h4>
                      <p>Cantidad: {item.quantity}</p>
                      <span className="item-price">${item.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="shipping-info">
                  <strong>Envío a:</strong> {order.shippingInfo.name}<br />
                  {order.shippingInfo.address}, {order.shippingInfo.city}
                </div>
                <div className="payment-info">
                  <FaCreditCard /> {order.paymentInfo.method.toUpperCase()}
                  {order.paymentInfo.bank && ` - ${order.paymentInfo.bank}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;