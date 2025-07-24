import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PanelAdmin.css';

export default function PanelAdmin() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el correo guardado en localStorage
    const correoGuardado = localStorage.getItem('usuarioCorreo');
    if (correoGuardado) {
      setUserEmail(correoGuardado);
    }
  }, []);

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleMyProjects = () => {
    navigate("/dashestablecimiento");
  };

  const handleConfiguration = () => {
    console.log('Configuración');
  };

  const handleCloseSession = () => {
    console.log('Cerrar sesión');
    localStorage.removeItem('usuarioCorreo'); // Limpia el correo si cierra sesión
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-image">
            <img src="" alt="Perfil" />
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Hola {userEmail ? userEmail : "Usuario"} 👋</h1>
          <p style={{ fontSize: '18px', marginTop: '10px' }}>
            Selecciona una opción para continuar
          </p>
        </div>

        <div className="menu-options">
          <div className="menu-item" onClick={handleMyProjects}>
            <div className="menu-icon">📁</div>
            <span>Mis Proyectos</span>
          </div>

          <div className="menu-item" onClick={handleConfiguration}>
            <div className="menu-icon">⚙️</div>
            <span>Configuración</span>
          </div>

          <div className="menu-item" onClick={handleCloseSession}>
            <div className="menu-icon">🚪</div>
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </div>
  );
}
