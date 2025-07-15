import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/Register.css';
import Logo from "../resources/img/logo_intergrador.png"

export default function Register() {
  const [formData, setFormData] = useState({
    establecimiento: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const recaptchaRef = useRef();

  // Reemplaza esta clave con tu clave de sitio de reCAPTCHA
  const RECAPTCHA_SITE_KEY = "6LflXIErAAAAAFqalpnpHnyfNp0gjQ0hztTT8DFr";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.values

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Verificar que todos los campos estén llenos
    if (!formData.establecimiento || !formData.email || !formData.password) {
      setMessage('Por favor, completa todos los campos');
      setMessageType('error');
      return;
    }

    // Verificar reCAPTCHA
    const captchaValue = recaptchaRef.current.getValue();
    if (!captchaValue) {
      setMessage('Por favor, completa el reCAPTCHA');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://44.207.222.107:8000/api/administrador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.establecimiento,
          correo: formData.email,
          password: formData.password,
        //   recaptcha: captchaValue // Enviar el token de reCAPTCHA al backend
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registro exitoso!');
        setMessageType('success');
        
        // Limpiar formulario
        setFormData({
          establecimiento: '',
          email: '',
          password: ''
        });
        
        // Resetear reCAPTCHA
        recaptchaRef.current.reset();
        
        // Opcional: redirigir después del registro exitoso
        // setTimeout(() => {
        //   window.location.href = '/login';
        // }, 2000);
        
      } else {
        setMessage(data.message || 'Error en el registro');
        setMessageType('error');
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Intenta nuevamente.');
      setMessageType('error');
      recaptchaRef.current.reset();
    } finally {
      setLoading(false);
    }
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        
        <div>
          <div className="form-group">
            <label htmlFor="establecimiento">Nombre del Establecimiento</label>
            <input
              type="text"
              id="establecimiento"
              name="establecimiento"
              placeholder="Introduce Nombre del Establecimiento"
              value={formData.establecimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="introduce correo"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="introduce contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* reCAPTCHA */}
          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="login-link">
            <span>¿Tienes cuenta? </span>
            <a href="#" onClick={(e) => e.preventDefault()}>Inicia Sesión</a>
          </div>

          <button 
            type="submit" 
            className="register-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Regístrate'}
          </button>
        </div>
      </div>

      <div className="welcome-section">
        <h2>Bienvenido!</h2>
        <div className="illustration">
          <div className="illustration-circle">
            <div className="character">
              <img className='logoregis' src={Logo} alt="Character Illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}