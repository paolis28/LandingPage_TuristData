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

  // Función para verificar y manejar errores de token
  const handleTokenError = (response) => {
    if (response.status === 401) {
      setMensaje('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      // Limpiar el token expirado
      localStorage.removeItem('token');
      // Opcional: redirigir al login después de un delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return true;
    }
    return false;
  };

  // Función para obtener el token con validación
  const getValidToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No se encontró el token de autenticación. Por favor, inicia sesión.');
      return null;
    }
    return token;
  };

  // Función para registrar temporada
  const handleRegistrarTemporada = async () => {
    const token = getValidToken();
    if (!token) return;

    setCargando(true);
    setMensaje(''); // Limpiar mensajes anteriores

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

      // Manejar errores de token
      if (handleTokenError(response)) {
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Temporada creada:', data);
        setIdTemporada(data.id || data.id_temporadas);
        setTemporadaRegistrada(true);
        setMensaje('Temporada registrada con éxito');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        console.error('Error al registrar temporada:', errorData);
        setMensaje(`Error al registrar la temporada: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } finally {
      setCargando(false);
    }
  };

  // Función para registrar lugar
  const handleRegistrarLugar = async () => {
    const token = getValidToken();
    if (!token) return;

    setCargando(true);
    setMensaje(''); // Limpiar mensajes anteriores

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

      // Manejar errores de token
      if (handleTokenError(response)) {
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Lugar creado:', data);
        setIdLugar(data.id || data.id_lugares);
        setLugarRegistrado(true);
        setMensaje('Lugar registrado con éxito');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        console.error('Error al registrar lugar:', errorData);
        setMensaje(`Error al registrar el lugar: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
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

    const token = getValidToken();
    if (!token) return;

    setCargando(true);
    setMensaje(''); // Limpiar mensajes anteriores

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

      // Manejar errores de token
      if (handleTokenError(response)) {
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Evento creado:', data);
        setMensaje('Evento especial registrado con éxito');
        limpiarCamposEvento();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        console.error('Error al registrar evento:', errorData);
        setMensaje(`Error al registrar el evento especial: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
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

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Verificar token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No hay sesión activa. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [navigate]);

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
          <button className="sidebar-btn" onClick={() => navigate('/perfil')}>
            Perfil
          </button>
          <button className="sidebar-btn" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
          <button className="sidebar-btn" onClick={() => navigate('/acerca')}>
            Acerca de
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>TuristData</h1>
          <p>Gestión de Eventos Especiales</p>
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
                    disabled={cargando}
                  />
                </div>

                <div className="form-group">
                  <label>Fecha de inicio:</label>
                  <input 
                    type="date" 
                    value={fechaInicioTemporada} 
                    onChange={(e) => setFechaInicioTemporada(e.target.value)}
                    disabled={cargando}
                  />
                </div>

                <div className="form-group">
                  <label>Fecha de terminación:</label>
                  <input 
                    type="date" 
                    value={fechaFinTemporada} 
                    onChange={(e) => setFechaFinTemporada(e.target.value)}
                    disabled={cargando}
                  />
                </div>

                <div className="form-group">
                  <label>Tipo de temporada:</label>
                  <select 
                    value={tipoTemporada} 
                    onChange={(e) => setTipoTemporada(e.target.value)}
                    disabled={cargando}
                  >
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
                    disabled={!temporadaRegistrada || cargando}
                  />
                </div>

                <div className="form-group">
                  <label>Estado:</label>
                  <select 
                    value={estadoLugar} 
                    onChange={(e) => setEstadoLugar(e.target.value)}
                    disabled={!temporadaRegistrada || cargando}
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
              disabled={!temporadaRegistrada || !lugarRegistrado || cargando}
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora de inicio:</label>
            <input 
              type="datetime-local" 
              value={fechaInicioEvento} 
              onChange={(e) => setFechaInicioEvento(e.target.value)}
              disabled={!temporadaRegistrada || !lugarRegistrado || cargando}
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora final:</label>
            <input 
              type="datetime-local" 
              value={fechaFinalEvento} 
              onChange={(e) => setFechaFinalEvento(e.target.value)}
              disabled={!temporadaRegistrada || !lugarRegistrado || cargando}
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea 
              value={descripcionEvento} 
              onChange={(e) => setDescripcionEvento(e.target.value)}
              placeholder="Describe el evento especial..."
              rows="4"
              disabled={!temporadaRegistrada || !lugarRegistrado || cargando}
            />
          </div>

          <div className="form-group">
            <label>Estado afectado:</label>
            <select 
              value={estadoAfectado} 
              onChange={(e) => setEstadoAfectado(e.target.value)}
              disabled={!temporadaRegistrada || !lugarRegistrado || cargando}
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
  );
}