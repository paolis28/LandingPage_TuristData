import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/EventosEspeciales.css';

export default function PanelEventosEspeciales() {
  // Estados para Temporada
  const [nombreTemporada, setNombreTemporada] = useState('');
  const [fechaInicioTemporada, setFechaInicioTemporada] = useState('');
  const [fechaFinTemporada, setFechaFinTemporada] = useState('');
  const [tipoTemporada, setTipoTemporada] = useState('');
  const [temporadaRegistrada, setTemporadaRegistrada] = useState(false);
  const [idTemporada, setIdTemporada] = useState(null);

  // Estados para Lugar
  const [nombreLugar, setNombreLugar] = useState('');
  const [estadoLugar, setEstadoLugar] = useState('');
  const [lugarRegistrado, setLugarRegistrado] = useState(false);
  const [idLugar, setIdLugar] = useState(null);

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

  // Obtener email del usuario
  const [email, setEmail] = useState('');

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

  // Función para registrar temporada
  const handleRegistrarTemporada = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No se encontró el token de autenticación');
      return;
    }

    setCargando(true);
    const formData = new FormData();
    formData.append('nombre', nombreTemporada);
    formData.append('fecha_inicio', fechaInicioTemporada);
    formData.append('fecha_fin', fechaFinTemporada);
    formData.append('tipo_temporada', tipoTemporada);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/temporada/rg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Temporada creada:', data);
        setIdTemporada(data.id || data.id_temporadas);
        setTemporadaRegistrada(true);
        setMensaje('Temporada registrada con éxito');
      } else {
        const errorText = await response.text();
        console.error('Error al registrar temporada:', errorText);
        setMensaje('Error al registrar la temporada');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  // Función para registrar lugar
  const handleRegistrarLugar = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No se encontró el token de autenticación');
      return;
    }

    setCargando(true);
    const formData = new FormData();
    formData.append('nombre', nombreLugar);
    formData.append('estado', estadoLugar);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/lugares/rg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lugar creado:', data);
        setIdLugar(data.id || data.id_lugares);
        setLugarRegistrado(true);
        setMensaje('Lugar registrado con éxito');
      } else {
        const errorText = await response.text();
        console.error('Error al registrar lugar:', errorText);
        setMensaje('Error al registrar el lugar');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  // Función para registrar evento especial
  const handleRegistrarEvento = async () => {
    if (!temporadaRegistrada || !lugarRegistrado) {
      setMensaje('Primero debe registrar la temporada y el lugar');
      return;
    }

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
    formData.append('id_temporada', idTemporada);
    formData.append('id_lugar', idLugar);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/eventosespeciales/rg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Evento creado:', data);
        setMensaje('Evento especial registrado con éxito');
        limpiarCamposEvento();
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

  const limpiarCamposEvento = () => {
    setNombreEvento('');
    setFechaInicioEvento('');
    setFechaFinalEvento('');
    setDescripcionEvento('');
    setEstadoAfectado('');
  };

  const reiniciarTodo = () => {
    // Limpiar temporada
    setNombreTemporada('');
    setFechaInicioTemporada('');
    setFechaFinTemporada('');
    setTipoTemporada('');
    setTemporadaRegistrada(false);
    setIdTemporada(null);

    // Limpiar lugar
    setNombreLugar('');
    setEstadoLugar('');
    setLugarRegistrado(false);
    setIdLugar(null);

    // Limpiar evento
    limpiarCamposEvento();
    setMensaje('');
  };

  return (
    <div className="eventos-especiales-view">
      <div className="dashboard-establishment-container">
        <div className="sidebar">
          <div className="profile-section">
            <div className="profile-image">
              {/* El ícono de usuario se muestra via CSS ::before */}
            </div>
            <div className="profile-info">
              <h3>Hola</h3>
              <p>{email ? email.split('@')[0] : 'Usuario'}</p>
            </div>
            <button className="edit-profile-btn" onClick={() => console.log('Editar perfil')}>
              EDITAR PERFIL
            </button>
          </div>

          <div className="sidebar-nav">
            <button
              className={`sidebar-btn ${isActive('/crear') ? 'active' : ''}`}
              onClick={() => navigate('/crear')}
            >
              <div className="btn-icon">🏢</div>
              <div className="btn-content">
                <span className="btn-title">Agregar establecimiento</span>
                <span className="btn-subtitle">Crear nuevo lugar turístico</span>
              </div>
            </button>

            <button
              className={`sidebar-btn ${isActive('/verestablecimiento') ? 'active' : ''}`}
              onClick={() => navigate('/verestablecimiento')}
            >
              <div className="btn-icon">👁️</div>
              <div className="btn-content">
                <span className="btn-title">Ver Establecimiento</span>
                <span className="btn-subtitle">Gestionar mis lugares</span>
              </div>
            </button>

            <button
              className={`sidebar-btn ${isActive('/crearevento') ? 'active' : ''}`}
              onClick={() => navigate('/crearevento')}
            >
              <div className="btn-icon">🎉</div>
              <div className="btn-content">
                <span className="btn-title">Eventos Especiales por temporada</span>
                <span className="btn-subtitle">Gestionar temporadas y eventos</span>
              </div>
            </button>

            <button 
              className="sidebar-btn logout-btn" 
              onClick={() => {
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                navigate('/');
              }}
            >
              <div className="btn-icon">🚪</div>
              <div className="btn-content">
                <span className="btn-title">Cerrar sesión</span>
                <span className="btn-subtitle">Salir de forma segura</span>
              </div>
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="header">
            <h1>TuristData</h1>
            <p>Gestión de Eventos Especiales por temporada</p>
          </div>

          {/* Fila de cards para Temporada y Lugar */}
          <div className="cards-row">
            {/* Card Temporada */}
            <div className={`form-card ${temporadaRegistrada ? 'card-completed' : ''}`}>
              <h2>
                {temporadaRegistrada ? '✓ Temporada Registrada' : '1. Registrar Temporada'}
              </h2>
              
              {!temporadaRegistrada ? (
                <>
                  <div className="form-group">
                    <label>Nombre de la temporada:</label>
                    <input 
                      type="text" 
                      value={nombreTemporada} 
                      onChange={(e) => setNombreTemporada(e.target.value)}
                      placeholder="Ej: Primavera 2025"
                    />
                  </div>

                  <div className="form-group">
                    <label>Fecha de inicio:</label>
                    <input 
                      type="date" 
                      value={fechaInicioTemporada} 
                      onChange={(e) => setFechaInicioTemporada(e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>Fecha de terminación:</label>
                    <input 
                      type="date" 
                      value={fechaFinTemporada} 
                      onChange={(e) => setFechaFinTemporada(e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo de temporada:</label>
                    <select value={tipoTemporada} onChange={(e) => setTipoTemporada(e.target.value)}>
                      <option value="">Selecciona el tipo</option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                      <option value="Especial">Especial</option>
                    </select>
                  </div>

                  <button 
                    className="create-btn" 
                    onClick={handleRegistrarTemporada}
                    disabled={cargando || !nombreTemporada || !fechaInicioTemporada || !fechaFinTemporada || !tipoTemporada}
                  >
                    {cargando ? 'Registrando...' : 'Registrar Temporada'}
                  </button>
                </>
              ) : (
                <div className="completed-info">
                  <p><strong>Nombre:</strong> {nombreTemporada}</p>
                  <p><strong>Período:</strong> {fechaInicioTemporada} al {fechaFinTemporada}</p>
                  <p><strong>Tipo:</strong> {tipoTemporada}</p>
                </div>
              )}
            </div>

            {/* Card Lugar */}
            <div className={`form-card ${lugarRegistrado ? 'card-completed' : ''}`}>
              <h2>
                {lugarRegistrado ? '✓ Lugar Registrado' : '2. Registrar Lugar'}
              </h2>
              
              {!lugarRegistrado ? (
                <>
                  <div className="form-group">
                    <label>Nombre del lugar:</label>
                    <input 
                      type="text" 
                      value={nombreLugar} 
                      onChange={(e) => setNombreLugar(e.target.value)}
                      placeholder="Ej: Monte Bello"
                      disabled={!temporadaRegistrada}
                    />
                  </div>

                  <div className="form-group">
                    <label>Estado:</label>
                    <select 
                      value={estadoLugar} 
                      onChange={(e) => setEstadoLugar(e.target.value)}
                      disabled={!temporadaRegistrada}
                    >
                      <option value="">Selecciona el estado</option>
                      <option value="Chiapas">Chiapas</option>
                      <option value="Oaxaca">Oaxaca</option>
                      <option value="Yucatán">Yucatán</option>
                    </select>
                  </div>

                  <button 
                    className="create-btn" 
                    onClick={handleRegistrarLugar}
                    disabled={cargando || !temporadaRegistrada || !nombreLugar || !estadoLugar}
                  >
                    {cargando ? 'Registrando...' : 'Registrar Lugar'}
                  </button>
                </>
              ) : (
                <div className="completed-info">
                  <p><strong>Nombre:</strong> {nombreLugar}</p>
                  <p><strong>Estado:</strong> {estadoLugar}</p>
                </div>
              )}
            </div>
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
                disabled={!temporadaRegistrada || !lugarRegistrado}
              />
            </div>

            <div className="form-group">
              <label>Fecha y hora de inicio:</label>
              <input 
                type="datetime-local" 
                value={fechaInicioEvento} 
                onChange={(e) => setFechaInicioEvento(e.target.value)}
                disabled={!temporadaRegistrada || !lugarRegistrado}
              />
            </div>

            <div className="form-group">
              <label>Fecha y hora final:</label>
              <input 
                type="datetime-local" 
                value={fechaFinalEvento} 
                onChange={(e) => setFechaFinalEvento(e.target.value)}
                disabled={!temporadaRegistrada || !lugarRegistrado}
              />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea 
                value={descripcionEvento} 
                onChange={(e) => setDescripcionEvento(e.target.value)}
                placeholder="Describe el evento especial..."
                rows="4"
                disabled={!temporadaRegistrada || !lugarRegistrado}
              />
            </div>

            <div className="form-group">
              <label>Estado afectado:</label>
              <select 
                value={estadoAfectado} 
                onChange={(e) => setEstadoAfectado(e.target.value)}
                disabled={!temporadaRegistrada || !lugarRegistrado}
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
                disabled={cargando || !temporadaRegistrada || !lugarRegistrado || !nombreEvento || !fechaInicioEvento || !fechaFinalEvento || !descripcionEvento || !estadoAfectado}
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
    </div>
  );
}