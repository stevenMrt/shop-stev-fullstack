import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/adminAPI';
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import UsersManagement from './UsersManagement';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getStats();
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>Error: {error}</p>
        <button onClick={loadDashboard}>Reintentar</button>
      </div>
    );
  }

  if (currentView === 'products') return <ProductsManagement />;
  if (currentView === 'orders') return <OrdersManagement />;
  if (currentView === 'users') return <UsersManagement />;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Dashboard de Administración</h1>
        <p>Panel de control de Shop-Stev</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Usuarios Registrados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Productos en Catálogo</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Pedidos Realizados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
            <p>Ingresos Totales</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="recent-orders">
          <h2>Pedidos Recientes</h2>
          <div className="orders-table">
            {recentOrders.map(order => (
              <div key={order._id} className="order-row">
                <div className="order-info">
                  <strong>#{order.orderNumber}</strong>
                  <span>{order.user.name}</span>
                </div>
                <div className="order-total">
                  ${order.total.toLocaleString()}
                </div>
                <div className={`order-status ${order.status}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="action-buttons">
            <button className="action-btn products" onClick={() => setCurrentView('products')}>
              <FaBox /> Gestionar Productos
            </button>
            <button className="action-btn orders" onClick={() => setCurrentView('orders')}>
              <FaShoppingCart /> Ver Todos los Pedidos
            </button>
            <button className="action-btn users" onClick={() => setCurrentView('users')}>
              <FaUsers /> Gestionar Usuarios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;