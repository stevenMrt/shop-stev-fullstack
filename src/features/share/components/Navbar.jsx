import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ cartItems, removeFromCart, updateQuantity, clearCart, onSearch, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setIsOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Shop-Stev
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : "☰"}
        </button>

        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {user?.role === 'admin' ? (
            // Menú solo para administrador
            <>
              <li>
                <Link to="/admin" className="navbar-link admin-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              </li>
              <li>
                <span className="user-greeting">Hola, {user.name}</span>
              </li>
              <li>
                <button className="logout-btn" onClick={onLogout}>Cerrar Sesión</button>
              </li>
            </>
          ) : (
            // Menú completo para usuarios normales
            <>
              {/* Navegación principal */}
              <li>
                <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="navbar-link" 
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="navbar-link" onClick={() => setMenuOpen(false)}>Nosotros</Link>
              </li>
              <li>
                <Link to="/contacto" className="navbar-link" onClick={() => setMenuOpen(false)}>Contacto</Link>
              </li>
              
              {/* Sección de usuario logueado */}
              {user && (
                <>
                  <li>
                    <Link to="/wishlist" className="navbar-link" onClick={() => setMenuOpen(false)}>Favoritos</Link>
                  </li>
                  <li>
                    <Link to="/orders" className="navbar-link" onClick={() => setMenuOpen(false)}>Mis Pedidos</Link>
                  </li>
                  <li>
                    <Link to="/perfil" className="navbar-link" onClick={() => setMenuOpen(false)}>Creador</Link>
                  </li>
                  <li>
                    <span className="user-greeting">Hola, {user.name}</span>
                  </li>
                  <li>
                    <button className="logout-btn" onClick={onLogout}>Cerrar Sesión</button>
                  </li>
                </>
              )}
              
              {/* Sección de usuario no logueado */}
              {!user && (
                <>
                  <li>
                    <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
                  </li>
                  <li>
                    <Link to="/register" className="navbar-link" onClick={() => setMenuOpen(false)}>Registrarse</Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        {user?.role !== 'admin' && (
          <div className="navbar-actions">
            <button className="search-toggle" onClick={toggleSearch} aria-label="Buscar">
              <FaSearch />
            </button>
            
            {showSearch && (
              <div className="search-dropdown">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="navbar-search-mobile"
                  autoFocus
                />
              </div>
            )}

            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="navbar-search"
            />

            <div className="navbar-cart">
              <button onClick={toggleCart} className="cart-btn">
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </button>
            </div>
          </div>
        )}
      </nav>

      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {isOpen && (
        <div className="cart-modal-overlay" onClick={toggleCart}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Tu carrito ({totalItems} productos)</h3>
              <button className="cart-close-btn" onClick={toggleCart}>
                <FaTimes />
              </button>
            </div>

            <div className="cart-content">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <FaShoppingCart size={48} />
                  <p>Tu carrito está vacío</p>
                  <p>Agrega algunos productos para comenzar</p>
                </div>
              ) : (
                <>
                  <ul className="cart-list">
                    {cartItems.map((item, idx) => (
                      <li key={idx} className="cart-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-img"
                        />
                        <div className="cart-item-info">
                          <span className="cart-item-name">{item.name}</span>
                          <span className="cart-item-price">${item.price}</span>
                          <div className="quantity-controls">
                            <button 
                              onClick={() => updateQuantity(idx, (item.quantity || 1) - 1)}
                              className="quantity-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="quantity">{item.quantity || 1}</span>
                            <button 
                              onClick={() => updateQuantity(idx, (item.quantity || 1) + 1)}
                              className="quantity-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <span className="item-total">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                          <button
                            className="cart-remove-btn"
                            onClick={() => removeFromCart(idx)}
                            title="Eliminar producto"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                    <div className="cart-actions">
                      <button className="btn-clear" onClick={clearCart}>
                        Vaciar carrito
                      </button>
                      <Link to="/checkout" className="btn-checkout" onClick={toggleCart}>
                        Proceder al pago
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
