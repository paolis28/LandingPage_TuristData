import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Panelestablecimiento.css';

export default function PanelEstablecimiento() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.email) {
          setEmail(parsedData.email);
        } else {
          console.warn('No se encontró la propiedad "email" en userData');
        }
      } catch (error) {
        console.error('Error al parsear userData:', error);
      }
    } else {
      console.warn('No se encontró userData en localStorage');
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {email || 'Usuario'}</h2>
        </div>

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
            className={`sidebar-btn ${isActive('/crear') ? 'active' : ''}`}
            onClick={() => navigate('/crearevento')}
          >
            Agregar Evento
          </button>

          <button
            className={`sidebar-btn ${isActive('/vercomentarios') ? 'active' : ''}`}
            onClick={() => navigate('/vercomentarios')}
          >
            Ver Comentarios
          </button>
          <button
            className="sidebar-btn"
            onClick={() => {
              localStorage.removeItem('userData');
              navigate('/');
            }}
          >
            Cerrar sesión
          </button>
          <button className="sidebar-btn" onClick={() => navigate('/Estadisticas')}>
            Estadistica
            
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="establishment-section">
          <div className="create-establishment-card" onClick={() => navigate('/crear')}>
            <div className="plus-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button className="create-btn">Crear Establecimiento</button>
          </div>

          <div className="establishment-status">
            <div className="status-message">
              <h3>Aún No has Registrado Ningún Establecimiento</h3>
              <p>Haz Click en el Botón Para Comenzar</p>
            </div>

            <div className="action-buttons">
              <button className="action-btn modify-btn" onClick={() => console.log('Modificar')}>
                Modificar
              </button>
              <button className="action-btn eliminate-btn" onClick={() => console.log('Eliminar')}>
                Eliminar
              </button>
              <button className="action-btn save-btn" onClick={() => console.log('Guardar')}>
                Guarda cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
