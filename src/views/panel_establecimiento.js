import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Panelestablecimiento.css';

export default function PanelEstablecimiento() {
  const [userName] = useState('Alfredo');
  const navigate = useNavigate();
  const location = useLocation(); // para manejar el estado activo dinámico

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {userName}</h2>
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
          <button className="sidebar-btn" onClick={() => console.log('Perfil')}>
            Perfil
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
          <h1>🌄 Hola {userName}</h1>
        </div>

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
