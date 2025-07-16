import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Privacidad.css';

const AvisoPrivacidad = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsAccepted(e.target.checked);
  };

  const handleAccept = () => {
    if (isAccepted) {
      alert('Términos y condiciones aceptados');
      navigate('/Inicio'); // Redirigir a la página de inicio
    }
  };

  return (
    <div className="privacy-container">
      <div className="privacy-card">
        {/* Avatar */}
        <div className="avatar-container">
          <div className="avatar-outer">
            <div className="avatar-inner">
              <span className="avatar-icon">👤</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <h1 className="privacy-title">
          Aviso de privacidad
        </h1>

        {/* Content */}
        <div className="privacy-content">
          <p>
            De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, TuristData informa:
          </p>

          <div className="content-section">
            <p className="section-title">¿QUIÉNES SOMOS?</p>
            <p>
              TuristData – Empresa dedicada a servicios de información turística 🏛️ Avenida Primera 
              Poniente Sur, núm. 228, col. Santa Anita, Centro, C.P. 29150, Suchiapa, Chiapas
            </p>
          </div>

          <div className="content-section">
            <p className="section-title">¿QUÉ DATOS OBTENEMOS?</p>
            <ul className="data-list">
              <li>Nombre de usuario</li>
              <li>Correo electrónico</li>
              <li>Contraseña (cifrada)</li>
              <li>Ubicación geográfica</li>
            </ul>
            <p className="warning-text">
              ❌NO solicitamos: Datos bancarios, números de tarjetas, teléfonos o fotografías
            </p>
          </div>

          <div className="content-section">
            <p className="section-title">¿PARA QUÉ USAMOS SUS DATOS?</p>
            <ul className="data-list">
              <li>Uso principal: Crear su cuenta y brindar servicios turísticos</li>
              <li>Uso secundario: Mejorar la app y enviar recomendaciones personalizadas</li>
            </ul>
          </div>

          <div className="content-section">
            <p className="section-title">SUS DERECHOS (ARCO)</p>
            <p>Puede Acceder, Rectificar, Cancelar u Oponerse al uso de sus datos.</p>
          </div>

          <div className="content-section">
            <p className="section-title">¿CÓMO EJERCER SUS DERECHOS?</p>
            <p>Contacto: <span className="contact-email">turistdata@ejemplo.com</span></p>
            <p>⏰ Respuesta: Máximo 20 días hábiles</p>
          </div>

          <div className="content-section">
            <p className="section-title">SEGURIDAD</p>
            <p>🔐 Sus datos están protegidos con medidas de seguridad técnicas y administrativas.</p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="accept-terms"
            checked={isAccepted}
            onChange={handleCheckboxChange}
            className="checkbox-input"
          />
          <label htmlFor="accept-terms" className="checkbox-label">
            Acepto los términos y condiciones de privacidad y estoy consciente sobre las políticas
          </label>
        </div>

        {/* Accept Button */}
        <div className="button-container">
          <button
            onClick={handleAccept}
            disabled={!isAccepted}
            className={`accept-button ${isAccepted ? 'enabled' : 'disabled'}`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvisoPrivacidad;