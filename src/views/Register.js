import React, { useState } from 'react';
import '../styles/Register.css';
import Logo from "../resources/img/logo_intergrador.png"

export default function Register() {
  const [formData, setFormData] = useState({
    establecimiento: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        
        <div onSubmit={handleSubmit}>
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

          <div className="login-link">
            <span>¿Tienes cuenta? </span>
            <a href="#" onClick={(e) => e.preventDefault()}>Inicia Sesión</a>
          </div>

          <button type="submit" className="register-btn" onClick={handleSubmit}>
            Regístrate
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