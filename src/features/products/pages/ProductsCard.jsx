import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaFilter, FaSortAmountDown, FaTh, FaList, FaChevronLeft, FaChevronRight, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { productsAPI } from '../../../services/api';


const ProductsCard = ({ addToCart, searchQuery, favorites, toggleFavorite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAll();
        setProducts(data);
        
        // Establecer rango de precios dinámico
        const prices = data.map(p => p.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
      } catch (err) {
        setError(`No se pudieron cargar los productos. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter((prod) => {
      const matchesSearch = (prod.title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || prod.category === filterCategory;
      const matchesPrice = prod.price >= priceRange.min && prod.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProducts.length - 3);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="catalog-container" id="catalogo">
      <div className="catalog-header">
        <h1>Catálogo</h1>
        <div className="catalog-controls">
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vista en cuadrícula"
            >
              <FaTh />
            </button>
            <button 
              className={`view-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Vista carrusel"
            >
              <FaList />
            </button>
          </div>
          
          <div className="filter-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Ordenar por</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="name">Nombre A-Z</option>
            </select>
            
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos que coincidan con tu búsqueda</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setFilterCategory('all');
              setSortBy('default');
              window.location.reload();
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          {viewMode === 'carousel' ? (
            <div className="carousel">
              <button 
                className="arrow left" 
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <FaChevronLeft />
              </button>
              <div className="carousel-track">
                {filteredProducts
                  .slice(currentIndex, currentIndex + 3)
                  .map((prod) => (
                    <ProductCard
                      key={prod._id || prod.id}
                      id={prod._id || prod.id}
                      image={prod.image}
                      title={prod.title}
                      category={prod.category}
                      description={prod.description}
                      price={prod.price}
                      rating={prod.rating}
                      addToCart={addToCart}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                    />
                  ))}
              </div>
              <button 
                className="arrow right" 
                onClick={nextSlide}
                disabled={currentIndex >= filteredProducts.length - 3}
              >
                <FaChevronRight />
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod._id || prod.id}
                  id={prod._id || prod.id}
                  image={prod.image}
                  title={prod.title}
                  category={prod.category}
                  description={prod.description}
                  price={prod.price}
                  rating={prod.rating}
                  addToCart={addToCart}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
          
          <div className="catalog-footer">
            <p>Mostrando {filteredProducts.length} de {products.length} productos</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsCard;
