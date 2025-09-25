import React, { useState, useEffect } from "react";
import { FaArrowDown, FaShoppingBag, FaStar, FaUsers } from "react-icons/fa";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/banner3.jpg",
      title: "¡Bienvenido a Shop-Stev!",
      subtitle: "Tu tienda de confianza con los mejores productos",
      cta: "Explorar Catálogo"
    },
    {
      image: "/banner3.jpg",
      title: "Ofertas Especiales",
      subtitle: "Descubre productos increíbles a precios únicos",
      cta: "Ver Ofertas"
    },
    {
      image: "/banner3.jpg",
      title: "Calidad Garantizada",
      subtitle: "Productos seleccionados con la mejor calidad",
      cta: "Conocer Más"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="hero-section" id="inicio">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-card">
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-image"
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <button 
                    className="hero-cta"
                    onClick={scrollToCatalog}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <FaShoppingBag className="stat-icon" />
          <div className="stat-content">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Productos</span>
          </div>
        </div>
        <div className="stat-item">
          <FaStar className="stat-icon" />
          <div className="stat-content">
            <span className="stat-number">4.8</span>
            <span className="stat-label">Valoración</span>
          </div>
        </div>
        <div className="stat-item">
          <FaUsers className="stat-icon" />
          <div className="stat-content">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Clientes</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToCatalog}>
        <FaArrowDown className="bounce" />
        <span>Explorar productos</span>
      </div>
    </section>
  );
}

export default Banner;