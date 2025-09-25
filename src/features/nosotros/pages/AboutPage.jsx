import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaUsers, FaRocket, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>Nosotros</h1>
          <p>Conoce más sobre Shop-Stev y nuestro compromiso contigo</p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <h2>Nuestra Historia</h2>
            <p>
              Shop-Stev nació de la pasión por crear experiencias de compra únicas y memorables. 
              Fundada en 2025, hemos crecido desde una pequeña idea hasta convertirse en una 
              plataforma confiable que conecta productos increíbles con personas increíbles.
            </p>
            <p>
              Nuestro enfoque se centra en la calidad, la innovación y, sobre todo, 
              en brindar el mejor servicio a nuestros clientes.
            </p>
          </div>

          <div className="about-values">
            <h2>Nuestros Valores</h2>
            <div className="values-grid">
              <div className="value-card">
                <FaHeart className="value-icon" />
                <h3>Pasión</h3>
                <p>Amamos lo que hacemos y se refleja en cada detalle</p>
              </div>
              <div className="value-card">
                <FaUsers className="value-icon" />
                <h3>Comunidad</h3>
                <p>Construimos relaciones duraderas con nuestros clientes</p>
              </div>
              <div className="value-card">
                <FaRocket className="value-icon" />
                <h3>Innovación</h3>
                <p>Siempre buscamos nuevas formas de mejorar</p>
              </div>
            </div>
          </div>

          <div className="about-location">
            <h2>Nuestra Ubicación</h2>
            <div className="location-content">
              <div className="location-info">
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <h4>Dirección</h4>
                    <p>Carrera 50c #95-32<br />Medellin,Colombia</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <h4>Teléfono</h4>
                    <p>+57 312 7277386</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>stevenmartinezh2@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <h4>Horarios</h4>
                    <p>Lun - Vie: 9:00 AM - 6:00 PM<br />Sáb: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890!2d-75.5594164!3d6.2882193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428cce0a052d3%3A0x361e5cd81ae81c73!2sCarrera%2050c%20%2395-32%2C%20Aranjuez%2C%20Medell%C3%ADn%2C%20Antioquia%2C%20Colombia!5e0!3m2!1ses!2sco!4v1703123456789!5m2!1ses!2sco"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Shop-Stev"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;