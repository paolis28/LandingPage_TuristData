import React, { useState } from 'react';
import '../styles/Register.css';
import Logo from "../resources/img/logo_intergrador.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.email || !formData.password) {
      setMessage('Por favor, completa todos los campos');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/administrador/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Guarda el token y el correo juntos en un objeto JSON en localStorage
        localStorage.setItem('userData', JSON.stringify({
          token: data.token,
          email: formData.email
        }));

        setMessage('¡Inicio de sesión exitoso!');
        setMessageType('success');

        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1500);
      } else {
        setMessage(data.message || 'Credenciales incorrectas');
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Introduce correo"
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
              placeholder="Introduce contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

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
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>

          <div className="login-link">
            <span>¿Eres nuevo usuario? </span>
            <Link to="/register">Regístrate</Link>
          </div>
        </form>
      </div>

      <div className="welcome-section">
        <h2>Bienvenido!</h2>
        <div className="illustration">
          <div className="illustration-circle">
            <div className="character">
              <img className="logoregis" src={Logo} alt="Character Illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
