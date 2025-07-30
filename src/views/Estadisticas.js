import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Estadisticas.css';
import '../styles/Panelestablecimiento.css';

const Estadisticas = () => {
  const [data, setData] = useState({
    visitas: 0,
    comentarios: [],
    calificaciones: []
  });

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const getAuthToken = () => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.token;
      } catch {
        console.error('Error al parsear userData');
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const token = getAuthToken();
    const establecimientoId = 1; // Si lo haces dinámico, puedes pasarlo por props o estado

    if (!token) {
      navigate('/');
      return;
    }

    fetch(`https://turistdata-back.onrender.com/api/comentario/establecimiento?establecimiento_id=${establecimientoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(comentarios => {
        const calificaciones = Array.isArray(comentarios)
          ? comentarios.map(c => ({ nombre: c.nombre, estrellas: c.estrellas_calificacion }))
          : [];

        setData({
          visitas: 1240,
          comentarios: Array.isArray(comentarios)
            ? comentarios.map(c => ({
                id: c.id_comentarios,
                texto: c.comentario,
                autor: c.nombre
              }))
            : [],
          calificaciones
        });
      })
      .catch(err => {
        console.error('Error al cargar comentarios:', err);
        setData({
          visitas: 1240,
          comentarios: [],
          calificaciones: []
        });
      });

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.email) {
          setEmail(parsedData.email);
        }
      } catch (error) {
        console.error('Error al parsear userData:', error);
      }
    }
  }, [navigate]);

  const promedioCalificaciones = () => {
    const total = data.calificaciones.reduce((sum, c) => sum + c.estrellas, 0);
    return data.calificaciones.length > 0 ? (total / data.calificaciones.length).toFixed(2) : '0.00';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {email || 'Usuario'}</h2>
        </div>
        <div className="sidebar-nav">
          <button className={`sidebar-btn ${isActive('/crear') ? 'active' : ''}`} onClick={() => navigate('/crear')}>
            Agregar establecimiento
          </button>
          <button className={`sidebar-btn ${isActive('/verestablecimiento') ? 'active' : ''}`} onClick={() => navigate('/verestablecimiento')}>
            Ver Establecimiento
          </button>
          <button className={`sidebar-btn ${isActive('/crearevento') ? 'active' : ''}`} onClick={() => navigate('/crearevento')}>
            Agregar Evento
          </button>
          <button className={`sidebar-btn ${isActive('/vercomentarios') ? 'active' : ''}`} onClick={() => navigate('/vercomentarios')}>
            Ver Comentarios
          </button>
          <button className="sidebar-btn" onClick={() => { localStorage.removeItem('userData'); navigate('/'); }}>
            Cerrar sesión
          </button>
          <button className={`sidebar-btn ${isActive('/Estadisticas') ? 'active' : ''}`} onClick={() => navigate('/Estadisticas')}>
            Estadistica
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="estadisticas-container">
          <h2 className="estadisticas-title">📈 Estadísticas del Sitio</h2>

          <h3 className="group-title">Actividad General</h3>
          <div className="estadisticas-grid">
            <div className="estadistica-card visitas">
              <h3>👁️ Visitas Totales</h3>
              <p className="estadistica-num">{data.visitas}</p>
            </div>

            <div className="estadistica-card calificaciones">
              <h3>⭐ Calificaciones</h3>
              <p>Promedio: <span className="promedio">{promedioCalificaciones()}</span> / 5</p>
              <ul>
                {data.calificaciones.map((calif, index) => (
                  <li key={index}>
                    <strong>{calif.nombre}:</strong>{' '}
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} style={{ color: i < calif.estrellas ? '#ffc107' : '#e4e5e9' }}>★</span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="group-title">Opiniones de Usuarios</h3>
          <div className="estadisticas-grid">
            <div className="estadistica-card comentarios">
              <h3>💬 Comentarios</h3>
              <ul>
                {data.comentarios.length > 0 ? data.comentarios.map((comentario) => (
                  <li key={comentario.id}>
                    <strong>{comentario.autor}:</strong> {comentario.texto}
                  </li>
                )) : (
                  <li>No hay comentarios disponibles.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
