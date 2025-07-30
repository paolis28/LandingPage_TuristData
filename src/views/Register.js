import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/Register.css';
import Logo from "../resources/img/logo_intergrador.png";

export default function Register() {
  const [formData, setFormData] = useState({
    establecimiento: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [errors, setErrors] = useState({}); // Nuevo estado para errores específicos
  const recaptchaRef = useRef();
  const navigate = useNavigate();

  const RECAPTCHA_SITE_KEY = "6LflXIErAAAAAFqalpnpHnyfNp0gjQ0hztTT8DFr";

  // VALIDACIONES DE FORMATO (EXPRESIONES REGULARES)
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Solo letras, números, espacios y algunos caracteres especiales básicos
    establecimiento: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.\_]{1,}$/,
    // Contraseña: al menos 8 caracteres, una mayúscula, una minúscula, un número
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  };

  // FUNCIÓN DE VALIDACIÓN COMPLETA
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'establecimiento':
        // 1. VALIDACIÓN DE FORMATO (Regex)
        if (!validationPatterns.establecimiento.test(value)) {
          newErrors[name] = 'El nombre solo puede contener letras, números, espacios y algunos caracteres básicos (-._)';
        }
        // 2. VALIDACIÓN DE LONGITUD
        else if (value.length < 3) {
          newErrors[name] = 'El nombre debe tener al menos 3 caracteres';
        }
        else if (value.length > 100) {
          newErrors[name] = 'El nombre no puede exceder los 100 caracteres';
        }
        // 3. VALIDACIÓN DE CONTENIDO (caracteres peligrosos)
        else if (/<script|javascript:|onload|onerror|<\/script>/i.test(value)) {
          newErrors[name] = 'El nombre contiene caracteres no permitidos';
        }
        else {
          delete newErrors[name];
        }
        break;

      case 'email':
        // 1. VALIDACIÓN DE FORMATO (Regex para email)
        if (!validationPatterns.email.test(value)) {
          newErrors[name] = 'Por favor ingresa un correo electrónico válido';
        }
        // 2. VALIDACIÓN DE LONGITUD
        else if (value.length > 254) {
          newErrors[name] = 'El correo electrónico es demasiado largo';
        }
        // 3. VALIDACIÓN DE CONTENIDO (caracteres peligrosos)
        else if (/<script|javascript:|onload|onerror/i.test(value)) {
          newErrors[name] = 'El correo contiene caracteres no permitidos';
        }
        else {
          delete newErrors[name];
        }
        break;

      case 'password':
        // 1. VALIDACIÓN DE FORMATO (Regex para contraseña segura)
        if (!validationPatterns.password.test(value)) {
          newErrors[name] = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
        }
        // 2. VALIDACIÓN DE LONGITUD
        else if (value.length < 8) {
          newErrors[name] = 'La contraseña debe tener al menos 8 caracteres';
        }
        else if (value.length > 128) {
          newErrors[name] = 'La contraseña no puede exceder los 128 caracteres';
        }
        // 4. VALIDACIÓN DE RANGO (en este caso, complejidad)
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
        }
        else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // VALIDACIÓN ADICIONAL DE RANGO PARA LONGITUD TOTAL
  const validateFormLength = () => {
    const totalLength = formData.establecimiento.length + formData.email.length + formData.password.length;
    return totalLength <= 500; // Límite total del formulario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar campo en tiempo real
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // VALIDACIÓN COMPLETA ANTES DE ENVIAR
    let isFormValid = true;

    // Validar que todos los campos estén llenos
    if (!formData.establecimiento || !formData.email || !formData.password) {
      setMessage('Por favor, completa todos los campos');
      setMessageType('error');
      return;
    }

    // Validar cada campo individualmente
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isFormValid = false;
      }
    });

    // VALIDACIÓN DE RANGO ADICIONAL
    if (!validateFormLength()) {
      setMessage('Los datos del formulario exceden el límite permitido');
      setMessageType('error');
      return;
    }

    // Verificar si hay errores de validación
    if (!isFormValid || Object.keys(errors).length > 0) {
      setMessage('Por favor, corrige los errores en el formulario');
      setMessageType('error');
      return;
    }

    const captchaValue = recaptchaRef.current.getValue();
    if (!captchaValue) {
      setMessage('Por favor, completa el reCAPTCHA');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/administrador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.establecimiento,
          correo: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Registro exitoso!');
        setMessageType('success');

        setFormData({
          establecimiento: '',
          email: '',
          password: ''
        });
        setErrors({}); // Limpiar errores
        recaptchaRef.current.reset();

        setTimeout(() => {
          navigate('/login');
        }, 2000);

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
              className={errors.establecimiento ? 'error-input' : ''}
              required
            />
            {errors.establecimiento && (
              <div className="error-message">{errors.establecimiento}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Introduce correo"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error-input' : ''}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
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
              className={errors.password ? 'error-input' : ''}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="login-link">
            <span>¿Tienes cuenta? </span>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigate('/login'); 
            }}>
              Inicia Sesión
            </a>
          </div>

          <button 
            type="submit" 
            className="register-btn" 
            onClick={handleSubmit}
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? 'Registrando...' : 'Regístrate'}
          </button>
        </div>
      </div>

      <div className="welcome-section">
        <h2>¡Bienvenido!</h2>
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