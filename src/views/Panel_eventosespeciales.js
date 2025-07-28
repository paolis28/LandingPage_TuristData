import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/EventosEspeciales.css';

export default function PanelEventosEspeciales() {
  // Estados para Evento Especial
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaInicioEvento, setFechaInicioEvento] = useState('');
  const [fechaFinalEvento, setFechaFinalEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [estadoAfectado, setEstadoAfectado] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

// Función para obtener el token correctamente
  const getAuthToken = () => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.token;
      } catch (error) {
        console.error('Error parsing userData:', error);
        return null;
      }
    }
    return null;
  };

// Función para registrar evento especial
// Función para registrar evento especial - CORREGIDA
const handleRegistrarEvento = async () => {
  const token = getAuthToken();
  if (!token) {
    setMensaje('No se encontró el token de autenticación');
    return;
  }

  setCargando(true);
  
  // En lugar de FormData, crear un objeto JSON
  const eventoData = {
    nombre: nombreEvento,
    fecha_inicio: fechaInicioEvento,
    fecha_final: fechaFinalEvento,
    descripcion: descripcionEvento,
    estado_afectado: estadoAfectado
  };

  try {
    const response = await fetch('https://turistdata-back.onrender.com/api/eventosespeciales/rg', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Importante: especificar que enviamos JSON
      },
      body: JSON.stringify(eventoData), // Convertir el objeto a JSON string
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Evento creado:', data);
      setMensaje('Evento especial registrado con éxito');
      limpiarCamposEvento();
    } else if (response.status === 401) {
      setMensaje('Sesión expirada. Redirigiendo al login...');
      localStorage.removeItem('userData');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error al registrar evento:', errorData);
      setMensaje(errorData.error || 'Error al registrar el evento especial');
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    setMensaje('No se pudo conectar con el servidor');
  } finally {
    setCargando(false);
  }
};

  const limpiarCamposEvento = () => {
    setNombreEvento('');
    setFechaInicioEvento('');
    setFechaFinalEvento('');
    setDescripcionEvento('');
    setEstadoAfectado('');
  };

  const reiniciarTodo = () => {
    // Limpiar evento
    limpiarCamposEvento();
    setMensaje('');
  };

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="sidebar-nav">
          <button
            className={`sidebar-btn ${isActive('/crear') ? 'active' : ''}`}
            onClick={() => navigate('/crear')}
          >
            Agregar establecimiento
          </button>
          <button
            className={`sidebar-btn ${isActive('/verestablecimiento') ? 'active' : ''}`}
            onClick={() => navigate('/verestablecimiento')}
          >
            Ver Establecimiento
          </button>
          <button
            className={`sidebar-btn ${isActive('/vercomentarios') ? 'active' : ''}`}
            onClick={() => navigate('/vercomentarios')}
          >
            Ver Comentarios
          </button>
          <button className="sidebar-btn" onClick={() => console.log('Cerrar sesión')}>
            Cerrar sesión
          </button>
          <button className="sidebar-btn" onClick={() => console.log('Acerca de')}>
            Acerca de
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>TuristData</h1>
          <p>Gestión de Eventos Especiales</p>
        </div>

        {/* Card Evento Especial */}
        <div className="form-card event-card">
          <h2>3. Registrar Evento Especial</h2>
          
          <div className="form-group">
            <label>Nombre del evento:</label>
            <input 
              type="text" 
              value={nombreEvento} 
              onChange={(e) => setNombreEvento(e.target.value)}
              placeholder="Ej: Feria del Mango"
              // disabled={!temporadaRegistrada || !lugarRegistrado}
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora de inicio:</label>
            <input 
              type="datetime-local" 
              value={fechaInicioEvento} 
              onChange={(e) => setFechaInicioEvento(e.target.value)}
              // disabled={!temporadaRegistrada || !lugarRegistrado}
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora final:</label>
            <input 
              type="datetime-local" 
              value={fechaFinalEvento} 
              onChange={(e) => setFechaFinalEvento(e.target.value)}
              // disabled={!temporadaRegistrada || !lugarRegistrado}
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea 
              value={descripcionEvento} 
              onChange={(e) => setDescripcionEvento(e.target.value)}
              placeholder="Describe el evento especial..."
              rows="4"
              // disabled={!temporadaRegistrada || !lugarRegistrado}
            />
          </div>

          <div className="form-group">
            <label>Estado afectado:</label>
            <select 
              value={estadoAfectado} 
              onChange={(e) => setEstadoAfectado(e.target.value)}
              // disabled={!temporadaRegistrada || !lugarRegistrado}
            >
              <option value="">Selecciona el estado</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Yucatán">Yucatán</option>
            </select>
          </div>

          <div className="button-group">
            <button 
              className="create-btn" 
              onClick={handleRegistrarEvento}
              disabled={cargando || !nombreEvento || !fechaInicioEvento || !fechaFinalEvento || !descripcionEvento || !estadoAfectado}
            >
              {cargando ? 'Registrando...' : 'Registrar Evento Especial'}
            </button>
            
            <button 
              className="reset-btn" 
              onClick={reiniciarTodo}
              disabled={cargando}
            >
              Reiniciar Todo
            </button>
          </div>
        </div>

        {mensaje && (
          <div className={`mensaje ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}