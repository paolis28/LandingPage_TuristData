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

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  return (
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
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>

        <div className="sidebar-nav">
          <button className="sidebar-btn" onClick={() => console.log('Perfil')}>
            <div className="btn-icon">👤</div>
            <div className="btn-content">
              <span className="btn-title">Perfil</span>
              <span className="btn-subtitle">Tu información personal</span>
            </div>
          </button>

          <button
            className="sidebar-btn logout-btn"
            onClick={() => {
              localStorage.removeItem('userData');
              navigate('/');
            }}
          >
            <div className="btn-icon">🚪</div>
            <div className="btn-content">
              <span className="btn-title">Cerrar sesión</span>
              <span className="btn-subtitle">Salir de forma segura</span>
            </div>
          </button>

          <button className="sidebar-btn" onClick={() => console.log('Acerca de')}>
            <div className="btn-icon">ℹ️</div>
            <div className="btn-content">
              <span className="btn-title">Acerca de</span>
              <span className="btn-subtitle">Información de la app</span>
            </div>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h1>Panel de Control</h1>
          <p>Gestiona tus establecimientos y eventos de manera eficiente</p>
        </div>

        <div className="dashboard-grid">
          {/* Estadísticas principales */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">🏢</div>
              <div className="stat-content">
                <h3>3</h3>
                <p>Establecimientos</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>8</h3>
                <p>Eventos Activos</p>
              </div>
            </div>
          </div>
          
 
          {/* Acciones rápidas */}
          <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="action-grid">
          <div className="action-card" onClick={() => navigate('/crear')}>
          <div className="action-icon">🏢</div>
         <h3>Nuevo Establecimiento</h3>
         <p>Agregar un lugar turístico</p>
         </div>

         <div className="action-card" onClick={() => navigate('/crearevento')}>
         <div className="action-icon">📆</div>
         <h3>Evento por Temporada</h3>
         <p>Programar eventos recurrentes o festivos</p>
         </div>

         <div className="action-card" onClick={() => navigate('/crearevento_especial')}>
         <div className="action-icon">✨</div>
         <h3>Evento Especial</h3>
         <p>Planear actividades únicas o destacadas</p>
         </div>

         <div className="action-card" onClick={() => navigate('/verestablecimiento')}>
         <div className="action-icon">👁️</div>
         <h3>Ver Mis Lugares</h3>
         <p>Gestionar establecimientos</p>
         </div>
        </div>
            </div>
          {/* Últimos establecimientos */}
          <div className="recent-section">
            <div className="section-header">
              <h2>Últimos Establecimientos</h2>
              <button className="see-all-btn" onClick={() => navigate('/verestablecimiento')}>
                Ver todos
              </button>
            </div>
            
            <div className="recent-list">
              <div className="recent-item">
                <div className="item-icon">🏨</div>
                <div className="item-content">
                  <h4>Hotel Playa Azul</h4>
                  <p>Creado hace 2 días</p>
                </div>
                <div className="item-status active">Activo</div>
              </div>
              
              <div className="recent-item">
                <div className="item-icon">🍽️</div>
                <div className="item-content">
                  <h4>Restaurante La Costa</h4>
                  <p>Creado hace 5 días</p>
                </div>
                <div className="item-status active">Activo</div>
              </div>
              
              <div className="recent-item">
                <div className="item-icon">🎭</div>
                <div className="item-content">
                  <h4>Teatro Municipal</h4>
                  <p>Creado hace 1 semana</p>
                </div>
                <div className="item-status pending">Pendiente</div>
              </div>
            </div>
          </div>

          {/* Estado del sistema */}
          <div className="system-status">
            <h2>Estado del Sistema</h2>
            <div className="status-content">
              <div className="status-item">
                <div className="status-indicator online"></div>
                <span>Todos los servicios operativos</span>
              </div>
              <div className="status-item">
                <div className="status-indicator online"></div>
                <span>Base de datos sincronizada</span>
              </div>
              <div className="status-item">
                <div className="status-indicator warning"></div>
                <span>Próximo mantenimiento: 15 Mar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
