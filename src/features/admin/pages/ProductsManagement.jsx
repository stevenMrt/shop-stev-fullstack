import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/adminAPI';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await adminAPI.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id) => {
    try {
      await adminAPI.updateProduct(id, formData);
      setEditingId(null);
      loadProducts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await adminAPI.deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      await adminAPI.createProduct(formData);
      setShowAddForm(false);
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
      loadProducts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="admin-loading">Cargando productos...</div>;

  return (
    <div className="admin-management">
      <div className="management-header">
        <h1>Gestión de Productos</h1>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Agregar Producto
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h3>Nuevo Producto</h3>
          <div className="form-grid">
            <input
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <input
              placeholder="Precio"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <input
              placeholder="Categoría"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
            <input
              placeholder="URL de imagen"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <textarea
              placeholder="Descripción"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAdd}><FaSave /> Guardar</button>
            <button onClick={() => setShowAddForm(false)}><FaTimes /> Cancelar</button>
          </div>
        </div>
      )}

      <div className="products-table">
        {products.map(product => (
          <div key={product._id} className="product-row">
            <img src={product.image} alt={product.title} className="product-thumb" />
            <div className="product-info">
              {editingId === product._id ? (
                <div className="edit-form">
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              ) : (
                <>
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <span>{product.category}</span>
                </>
              )}
            </div>
            <div className="product-actions">
              {editingId === product._id ? (
                <>
                  <button onClick={() => handleSave(product._id)}><FaSave /></button>
                  <button onClick={() => setEditingId(null)}><FaTimes /></button>
                </>
              ) : (
                <>
                  <button onClick={() => {
                    setEditingId(product._id);
                    setFormData({
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      image: product.image
                    });
                  }}><FaEdit /></button>
                  <button onClick={() => handleDelete(product._id)}><FaTrash /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;