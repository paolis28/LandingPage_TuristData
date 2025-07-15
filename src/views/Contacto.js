import React, { useState } from 'react';
import '../styles/Contacto.css';
import Logo from "../resources/img/logo_intergrador.png"

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Validar campos
    if (!formData.nombre || !formData.correo) {
      setMessage('Por favor, completa todos los campos');
      setMessageType('error');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setMessage('Por favor, ingresa un correo válido');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para envío
      const contactData = {
        nombre: formData.nombre,
        correo: formData.correo,
        mensaje: "Necesito ayuda", // Mensaje automático
        fecha: new Date().toISOString()
      };

      // Aquí puedes cambiar la URL por tu endpoint de contacto
      const response = await fetch('http://44.207.222.107:8000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
        setMessageType('success');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          correo: ''
        });
        
      } else {
        setMessage(data.message || 'Error al enviar el mensaje');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Intenta nuevamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h1>Contacto</h1>
        <p className="contact-subtitle">¿Necesitas ayuda? Estamos aquí para apoyarte</p>
        
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="ingresa tu correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auto-message">
            <p><strong>Mensaje:</strong> "Necesito ayuda"</p>
            <small>Este mensaje se enviará automáticamente</small>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="contact-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar solicitud de ayuda'}
          </button>
        </div>

        <div className="contact-info">
          <h3>Información de contacto</h3>
          <div className="contact-details">
            <p><strong>Email:</strong> soporte@tuempresa.com</p>
            <p><strong>Teléfono:</strong> +52 (961) 123-4567</p>
            <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <div className="contact-hero">
        <h2>¡Estamos aquí para ayudarte!</h2>
        <div className="illustration">
          <div className="illustration-circle">
            <div className="character">
              <img className='logocontact' src={Logo} alt="Support Illustration" />
            </div>
          </div>
        </div>
        <p className="hero-text">
          Nuestro equipo de soporte está listo para resolver todas tus dudas
        </p>
      </div>
    </div>
  );
}