import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/EventosEspeciales.css';

export default function PanelEventosEspeciales() {
  // Estados para Temporada
  // const [nombreTemporada, setNombreTemporada] = useState('');
  // const [fechaInicioTemporada, setFechaInicioTemporada] = useState('');
  // const [fechaFinTemporada, setFechaFinTemporada] = useState('');
  // const [tipoTemporada, setTipoTemporada] = useState('');
  // const [estatus, setEstatus] = useState('');
  // const [temporadaRegistrada, setTemporadaRegistrada] = useState(false);
  // const [idTemporada, setIdTemporada] = useState(null);

  // // Estados para Lugar
  // const [nombreLugar, setNombreLugar] = useState('');
  // const [estadoLugar, setEstadoLugar] = useState('');
  // const [lugarRegistrado, setLugarRegistrado] = useState(false);
  // const [idLugar, setIdLugar] = useState(null);

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

// const handleRegistrarTemporada = async () => {
//   const token = getAuthToken();
//   if (!token) {
//     setMensaje('No se encontró el token de autenticación');
//     return;
//   }

//   setCargando(true);
//   setMensaje('');

  // const payload = {
  //   nombre: nombreTemporada,
  //   fecha_inicio: fechaInicioTemporada,
  //   fecha_fin: fechaFinTemporada,
  //   tipo_temporada: tipoTemporada,
  //   estatus: estatus
  // };

//   try {
//     const response = await fetch('https://turistdata-back.onrender.com/api/temporada/rg', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Temporada creada:', data);
//       setIdTemporada(data.id || data.id_temporadas);
//       setTemporadaRegistrada(true);
//       setMensaje('Temporada registrada con éxito');
//     } else if (response.status === 401) {
//       setMensaje('Sesión expirada. Redirigiendo al login...');
//       localStorage.removeItem('userData');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } else {
//       const errorData = await response.json().catch(() => ({}));
//       console.error('Error al registrar temporada:', errorData);
//       setMensaje(errorData.error || 'Error al registrar la temporada');
//     }
//   } catch (error) {
//     console.error('Error de conexión:', error);
//     setMensaje('No se pudo conectar con el servidor');
//   } finally {
//     setCargando(false);
//   }
// };

// ✅ FUNCIÓN CORREGIDA PARA REGISTRAR LUGAR
// const handleRegistrarLugar = async () => {
//   const token = getAuthToken();
//   if (!token) {
//     setMensaje('No se encontró el token de autenticación');
//     return;
//   }

//   // Validaciones
//   if (!nombreLugar.trim()) {
//     setMensaje('El nombre del lugar es requerido');
//     return;
//   }

//   if (!estadoLugar) {
//     setMensaje('Debe seleccionar un estado');
//     return;
//   }

//   setCargando(true);
//   setMensaje('');

//   const payloadLu = {
//     nombre: nombreLugar.trim(),
//     estado: estadoLugar
//   };

//   console.log('🚀 Enviando datos del lugar:', payloadLu);
// }
//   try {
//     // ✅ FETCH LIMPIO SIN HEADERS INCORRECTOS
//     const response = await fetch('https://turistdata-back.onrender.com/api/lugares/rg', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payloadLu)
//     });

//     console.log('📡 Response status:', response.status);

//     if (response.ok) {
//       const data = await response.json();
//       console.log('✅ Lugar creado:', data);
//       setIdLugar(data.id || data.id_lugar || data.id_lugares);
//       setLugarRegistrado(true);
//       setMensaje('Lugar registrado con éxito');
//     } else if (response.status === 401) {
//       setMensaje('Sesión expirada. Redirigiendo al login...');
//       localStorage.removeItem('userData');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } else {
//       let errorMessage = `Error ${response.status}`;
//       try {
//         const errorData = await response.json();
//         errorMessage = errorData.error || errorData.message || errorMessage;
//       } catch (e) {
//         const errorText = await response.text();
//         if (errorText) errorMessage = errorText;
//       }
//       console.error('❌ Error del servidor:', errorMessage);
//       setMensaje(errorMessage);
//     }
//   } catch (error) {
//     console.error('💥 Error completo:', error);
//     if (error.message.includes('Failed to fetch')) {
//       setMensaje('Error de conexión: Verificar CORS en el servidor');
//     } else {
//       setMensaje(`Error de conexión: ${error.message}`);
//     }
//   } finally {
//     setCargando(false);
//   }
// };

// Función para registrar evento especial
const handleRegistrarEvento = async () => {
  // if (!temporadaRegistrada || !lugarRegistrado) {
  //   setMensaje('Primero debe registrar la temporada y el lugar');
  //   return;
  // }

  const token = getAuthToken();
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
  // formData.append('id_temporada', idTemporada);
  // formData.append('id_lugar', idLugar);

  try {
    const response = await fetch('https://turistdata-back.onrender.com/api/eventosespeciales/rg', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
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
    // Limpiar temporada
    // setNombreTemporada('');
    // setFechaInicioTemporada('');
    // setFechaFinTemporada('');
    // setTipoTemporada('');
    // setEstatus('')
    // setTemporadaRegistrada(false);
    // setIdTemporada(null);

    // // Limpiar lugar
    // setNombreLugar('');
    // setEstadoLugar('');
    // setLugarRegistrado(false);
    // setIdLugar(null);

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

        {/* Fila de cards para Temporada y Lugar */}
        {/* <div className="cards-row"> */}
          {/* Card Temporada */}
          {/* <div className={`form-card ${temporadaRegistrada ? 'card-completed' : ''}`}>
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
                </div> */}

                {/* ✅ SELECT DE ESTATUS CORREGIDO */}
                {/* <div className="form-group">
                  <label>Estatus:</label>
                  <select value={estatus} onChange={(e) => setEstatus(e.target.value)}>
                    <option value="">Selecciona el estatus</option>
                    <option value="Activa">Activa</option>
                    <option value="En espera">En espera</option>
                  </select>
                </div>

                <button 
                  className="create-btn" 
                  onClick={handleRegistrarTemporada}
                  disabled={cargando || !nombreTemporada || !fechaInicioTemporada || !fechaFinTemporada || !tipoTemporada || !estatus}
                >
                  {cargando ? 'Registrando...' : 'Registrar Temporada'}
                </button>
              </>
            ) : (
              <div className="completed-info">
                <p><strong>Nombre:</strong> {nombreTemporada}</p>
                <p><strong>Período:</strong> {fechaInicioTemporada} al {fechaFinTemporada}</p>
                <p><strong>Tipo:</strong> {tipoTemporada}</p>
                <p><strong>Estatus:</strong> {estatus}</p>
              </div>
            )}
          </div> */}

          {/* Card Lugar */}
          {/* <div className={`form-card ${lugarRegistrado ? 'card-completed' : ''}`}>
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
        </div> */}

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