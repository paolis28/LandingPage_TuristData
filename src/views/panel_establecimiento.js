import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Panelestablecimiento.css';

export default function PanelEstablecimiento() {
  const [userName] = useState('Alfredo');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const navigate = useNavigate(); 

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleAddEstablishment = () => {
    console.log('Agregar establecimiento');
  };

  const handleViewEstablishment = () => {
    console.log('Ver establecimiento');
    navigate('/verestablecimiento');
  };

  const handleCloseSession = () => {
    console.log('Cerrar sesión');
  };

  const handleAbout = () => {
    console.log('Acerca de');
  };

  const handleCreateEstablishment = () => {
    navigate('/crear'); 
  };

  const handleModify = () => {
    console.log('Modificar establecimiento');
  };

  const handleEliminate = () => {
    console.log('Eliminar establecimiento');
  };

  const handleSaveChanges = () => {
    console.log('Guardar cambios');
  };

  const toggleActionButtons = () => {
    setShowActionButtons(!showActionButtons);
  };

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-image">
            <img src="" alt="Profile" />
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>

        <div className="menu-sidebar">
          <div className="menu-item-sidebar" onClick={handleAddEstablishment}>
            <span>Agregar establecimiento</span>
          </div>
          <div className="menu-item-sidebar" onClick={handleViewEstablishment}>
            <span>Ver Establecimiento</span>
          </div>
          <div className="menu-item-sidebar" onClick={handleCloseSession}>
            <span>Cerrar sesión</span>
          </div>
          <div className="menu-item-sidebar" onClick={handleAbout}>
            <span>Acerca de</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Hola {userName}</h1>
        </div>

        <div className="establishment-section">
          <div className="create-establishment-card" onClick={handleCreateEstablishment}>
            <div className="plus-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <button className="action-btn modify-btn" onClick={handleModify}>
                Modificar
              </button>
              <button className="action-btn eliminate-btn" onClick={handleEliminate}>
                Eliminar
              </button>
              <button className="action-btn save-btn" onClick={handleSaveChanges}>
                Guarda cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
