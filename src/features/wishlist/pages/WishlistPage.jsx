import React from 'react';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';

const WishlistPage = ({ favorites, toggleFavorite, addToCart }) => {
  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1><FaHeart /> Mi Lista de Deseos</h1>
          <p>{favorites.length} productos guardados</p>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-wishlist">
            <FaHeart size={64} />
            <h3>Tu lista de deseos está vacía</h3>
            <p>Agrega productos que te gusten para verlos aquí</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {favorites.map((product) => (
              <div key={product.id} className="wishlist-item">
                <img src={product.image} alt={product.name} />
                <div className="item-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <div className="item-actions">
                    <button 
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <FaShoppingCart /> Agregar al Carrito
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => toggleFavorite(product)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;