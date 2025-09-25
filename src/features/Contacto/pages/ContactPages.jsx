import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaUser, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    celular: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.celular.trim()) newErrors.celular = "El celular es requerido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    else if (formData.message.length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_ulr1xi3",
        "template_vfg3s2o",
        {
          name: formData.name,
          email: formData.email,
          celular: formData.celular,
          subject: formData.subject,
          message: formData.message,
        },
        "ocFkgBpw8e1Q8nkBP"
      );
      
      setStatus("success");
      setFormData({ name: "", email: "", celular: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Dirección</h4>
                <p>Carrera 50c #95-32<br />Ciudad, Medellin</p>
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
                <p>stevenmartinezh2@gmail</p>
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

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser /> Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="celular">
                    <FaPhone /> Teléfono
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    className={errors.celular ? 'error' : ''}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.celular && <span className="error-message">{errors.celular}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta general</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="devolucion">Devolución</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Escribe tu mensaje aquí..."
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
                <div className="char-count">
                  {formData.message.length}/500
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Enviar Mensaje
                  </>
                )}
              </button>
            </form>

            {status === "success" && (
              <div className="status-message success">
                ✓ ¡Mensaje enviado correctamente! Te responderemos pronto.
              </div>
            )}
            
            {status === "error" && (
              <div className="status-message error">
                ✗ Error al enviar el mensaje. Por favor, inténtalo de nuevo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;