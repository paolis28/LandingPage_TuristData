import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/Register.css';
import Logo from "../resources/img/logo_intergrador.png"
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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

    setLoading(true);

    try {
      const response = await fetch('http://44.207.222.107:8000/api/administrador/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        
        
      } else {
        setMessage(data.message || 'Error en el registro');
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
    <div className="register-container">
      <div className="register-form">
        <h1>Login</h1>
        
        <div>
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

          {/* Mensaje de estado */}
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="login-link">
            <span>¿Olvidaste tu contraseña? </span>
            <a href="#" onClick={(e) => e.preventDefault()}>Recuperar cuenta</a>
          </div>

          <button 
            type="submit" 
            className="register-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Entrar'}
          </button>

                    
          <Link to="/register">
            <div className="login-link">
                <span>¿Eres nuevo usuario? </span>
                <a href="#" onClick={(e) => e.preventDefault()}>Registrate</a>
            </div>
          </Link>
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