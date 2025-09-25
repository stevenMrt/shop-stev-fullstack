import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";

function ProductCard({ id, image, title, category, description, price, rating, addToCart, favorites, toggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  
  const product = { 
    id: id,
    image: image || "",
    name: title || "Sin título",
    category: category || "Sin categoría",
    description: description || "Sin descripción",
    price: price || 0,
    rating: rating || { rate: 0, count: 0 }
  };

  const isFavorite = favorites?.some(fav => fav.id === product.id) || false;
  const truncatedDescription = product.description.length > 100 
    ? product.description.substring(0, 100) + "..." 
    : product.description;

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    
    const emptyStars = 5 - Math.ceil(rate);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }
    
    return stars;
  };

  return (
    <div className="product-card fade-in">
      <div className="product-image-container">
        {!imageLoaded && <div className="image-placeholder">Cargando...</div>}
        <img 
          src={product.image} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite?.(product)}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      
      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating.rate)}
          </div>
          <span className="rating-text">
            {product.rating.rate} ({product.rating.count} reseñas)
          </span>
        </div>
        
        <div className="product-description">
          <p>{showFullDescription ? product.description : truncatedDescription}</p>
          {product.description.length > 100 && (
            <button 
              className="toggle-description"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
        
        <div className="product-price">${product.price}</div>
        
        <div className="product-actions">
          <button 
            className="btn-add"
            onClick={() => addToCart(product)}
            title="Agregar al carrito"
          >
            <FaShoppingCart /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
