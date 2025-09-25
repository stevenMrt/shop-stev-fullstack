import React, { useState } from 'react';
import { FaFilter, FaTimes, FaSearch, FaStar } from 'react-icons/fa';

const AdvancedSearch = ({ onFilter, categories, priceRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    minRating: 0,
    sortBy: 'default'
  });

  const handleApplyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: '',
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating: 0,
      sortBy: 'default'
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  return (
    <>
      <button className="filter-toggle" onClick={() => setIsOpen(true)}>
        <FaFilter /> Filtros Avanzados
      </button>

      {isOpen && (
        <div className="filter-overlay" onClick={() => setIsOpen(false)}>
          <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
            <div className="filter-header">
              <h3>Filtros Avanzados</h3>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="filter-content">
              <div className="filter-group">
                <label>Categoría</label>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Rango de Precio</label>
                <div className="price-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Calificación Mínima</label>
                <div className="rating-filter">
                  {[1,2,3,4,5].map(rating => (
                    <button
                      key={rating}
                      className={`rating-btn ${filters.minRating >= rating ? 'active' : ''}`}
                      onClick={() => setFilters({...filters, minRating: rating})}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Ordenar por</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                >
                  <option value="default">Por defecto</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Calificados</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-btn" onClick={clearFilters}>
                Limpiar
              </button>
              <button className="apply-btn" onClick={handleApplyFilters}>
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedSearch;