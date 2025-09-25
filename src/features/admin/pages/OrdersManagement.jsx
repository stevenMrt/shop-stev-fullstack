import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/adminAPI';
import { FaEye, FaEdit } from 'react-icons/fa';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await adminAPI.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error:', error);
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

  if (loading) return <div className="admin-loading">Cargando pedidos...</div>;

  return (
    <div className="admin-management">
      <div className="management-header">
        <h1>Gestión de Pedidos</h1>
        <p>Total: {orders.length} pedidos</p>
      </div>

      <div className="orders-grid">
        {orders.map(order => (
          <div key={order._id} className="order-card-admin">
            <div className="order-header-admin">
              <h3>#{order.orderNumber}</h3>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                style={{ color: getStatusColor(order.status) }}
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            
            <div className="order-customer">
              <strong>{order.user.name}</strong>
              <span>{order.user.email}</span>
            </div>
            
            <div className="order-items-admin">
              {order.items.map(item => (
                <div key={item._id} className="order-item-admin">
                  <span>{item.product.title}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="order-total-admin">
              <strong>${order.total.toLocaleString()}</strong>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;