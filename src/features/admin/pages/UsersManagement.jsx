import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/adminAPI';
import { FaUser, FaCrown, FaEnvelope, FaCalendar } from 'react-icons/fa';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await adminAPI.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Cargando usuarios...</div>;

  return (
    <div className="admin-management">
      <div className="management-header">
        <h1>Gestión de Usuarios</h1>
        <p>Total: {users.length} usuarios registrados</p>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <div className="user-avatar">
              <FaUser />
            </div>
            
            <div className="user-info">
              <div className="user-name">
                <h3>{user.name}</h3>
                {user.role === 'admin' && <FaCrown className="admin-crown" />}
              </div>
              
              <div className="user-details">
                <div className="user-detail">
                  <FaEnvelope />
                  <span>{user.email}</span>
                </div>
                
                <div className="user-detail">
                  <FaCalendar />
                  <span>Registrado: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-number">{user.cart?.length || 0}</span>
                  <span className="stat-label">En Carrito</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{user.favorites?.length || 0}</span>
                  <span className="stat-label">Favoritos</span>
                </div>
              </div>
            </div>
            
            <div className={`user-role ${user.role}`}>
              {user.role === 'admin' ? 'Administrador' : 'Usuario'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersManagement;