import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import '../styles/Crear_Evento_Especial.css';

export default function CrearEvento() {
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaInicioEvento, setFechaInicioEvento] = useState('');
  const [fechaFinalEvento, setFechaFinalEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [estadoAfectado, setEstadoAfectado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setEmail(parsedData.email || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleRegistrarEvento = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No se encontró el token de autenticación');
      return;
    }

    setCargando(true);
    const formData = new FormData();
    formData.append('nombre', nombreEvento);
    formData.append('fecha_inicio', fechaInicioEvento);
    formData.append('fecha_final', fechaFinalEvento);
    formData.append('descripcion', descripcionEvento);
    formData.append('estado_afectado', estadoAfectado);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/eventosespeciales/rg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMensaje('Evento especial registrado con éxito');
        limpiarCampos();
      } else {
        const errorText = await response.text();
        console.error('Error al registrar evento:', errorText);
        setMensaje('Error al registrar el evento especial');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const limpiarCampos = () => {
    setNombreEvento('');
    setFechaInicioEvento('');
    setFechaFinalEvento('');
    setDescripcionEvento('');
    setEstadoAfectado('');
  };

  return (
    <div className="eventos-especiales-view">
      <div className="dashboard-establishment-container">
        {/* Sidebar (igual al actual) */}
        <div className="sidebar">
          <div className="profile-section">
            <div className="profile-image"></div>
            <div className="profile-info">
              <h3>Hola</h3>
              <p>{email ? email.split('@')[0] : 'Usuario'}</p>
            </div>
            <button className="edit-profile-btn">EDITAR PERFIL</button>
          </div>

          <div className="sidebar-nav">
            <button className={`sidebar-btn ${isActive('/crear') ? 'active' : ''}`} onClick={() => navigate('/crear')}>
              <div className="btn-icon">🏢</div>
              <div className="btn-content">
                <span className="btn-title">Agregar establecimiento</span>
                <span className="btn-subtitle">Crear nuevo lugar turístico</span>
              </div>
            </button>
            <button className={`sidebar-btn ${isActive('/verestablecimiento') ? 'active' : ''}`} onClick={() => navigate('/verestablecimiento')}>
              <div className="btn-icon">👁️</div>
              <div className="btn-content">
                <span className="btn-title">Ver Establecimiento</span>
                <span className="btn-subtitle">Gestionar mis lugares</span>
              </div>
            </button>
            <button className={`sidebar-btn ${isActive('/crearevento') ? 'active' : ''}`} onClick={() => navigate('/crearevento')}>
              <div className="btn-icon">🎉</div>
              <div className="btn-content">
                <span className="btn-title">Eventos Especiales por temporada</span>
                <span className="btn-subtitle">Registrar evento directo</span>
              </div>
            </button>
            <button className="sidebar-btn logout-btn" onClick={() => {
              localStorage.removeItem('userData');
              localStorage.removeItem('token');
              navigate('/');
            }}>
              <div className="btn-icon">🚪</div>
              <div className="btn-content">
                <span className="btn-title">Cerrar sesión</span>
                <span className="btn-subtitle">Salir de forma segura</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <h1>TuristData</h1>
            <p>Crear Evento Especial</p>
          </div>

          <div className="form-card">
            <h2>Registrar Evento Especial</h2>

            <div className="form-group">
              <label>Nombre del evento:</label>
              <input type="text" value={nombreEvento} onChange={(e) => setNombreEvento(e.target.value)} placeholder="Ej: Feria del Mango" />
            </div>

            <div className="form-group">
              <label>Fecha y hora de inicio:</label>
              <input type="datetime-local" value={fechaInicioEvento} onChange={(e) => setFechaInicioEvento(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Fecha y hora final:</label>
              <input type="datetime-local" value={fechaFinalEvento} onChange={(e) => setFechaFinalEvento(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea value={descripcionEvento} onChange={(e) => setDescripcionEvento(e.target.value)} placeholder="Describe el evento especial..." rows="4" />
            </div>

            <div className="form-group">
              <label>Estado afectado:</label>
              <select value={estadoAfectado} onChange={(e) => setEstadoAfectado(e.target.value)}>
                <option value="">Selecciona el estado</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Yucatán">Yucatán</option>
              </select>
            </div>

            <div className="button-group">
              <button className="create-btn" onClick={handleRegistrarEvento} disabled={!nombreEvento || !fechaInicioEvento || !fechaFinalEvento || !descripcionEvento || !estadoAfectado || cargando}>
                {cargando ? 'Registrando...' : 'Registrar Evento Especial'}
              </button>

              <button className="reset-btn" onClick={limpiarCampos} disabled={cargando}>
                Reiniciar Todo
              </button>
            </div>

            {mensaje && (
              <div className={`mensaje ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
