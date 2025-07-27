import React, { useState, useEffect } from 'react'; // agrega useEffect
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PanelCrear.css';

export default function PanelCrear() {
  const [email, setEmail] = useState(''); // para almacenar correo usuario
  const [nombreLugar, setNombreLugar] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState('');
  const [horarioApertura, setHorarioApertura] = useState('');
  const [horarioCierre, setHorarioCierre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Leer el correo del usuario desde localStorage al montar el componente
  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      if (userData.email) setEmail(userData.email);
    }
  }, []);

  const handleAddEstablishment = async () => {
    if (!imagenFile) {
      setMensaje('Debes seleccionar una imagen');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('No se encontró el token de autenticación');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombreLugar);
    formData.append('direccion', direccion);
    formData.append('ciudad', ciudad);
    formData.append('estado', estado);
    formData.append('tipo', tipo);
    formData.append('horario', `${horarioApertura} - ${horarioCierre}`);
    formData.append('precio', precio);
    formData.append('imagen', imagenFile);

    try {
      const response = await fetch('https://turistdata-back.onrender.com/api/establecimientos/rg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Establecimiento creado:', data);
        setMensaje('Establecimiento registrado con éxito');
        limpiarCampos();
      } else {
        const errorText = await response.text();
        console.error('Error al registrar:', errorText);
        setMensaje('Error al registrar el establecimiento');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('No se pudo conectar con el servidor');
    }
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const limpiarCampos = () => {
    setNombreLugar('');
    setDireccion('');
    setCiudad('');
    setTipo('');
    setEstado('');
    setHorarioApertura('');
    setHorarioCierre('');
    setPrecio('');
    setImagenFile(null);
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
          <button className="edit-profile-btn" onClick={() => console.log('Editar perfil')}>
            Editar Perfil
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
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>TuristData</h1>
          <p>Te conecta con los sabores y paisajes de toda la República.</p>
        </div>

        <div className="form-card">
          <h2>Registrar Establecimiento</h2>

          {/* Fila 1: Nombre del lugar y Tipo */}
          <div className="form-row">
            <div className="form-group">
              <label>Nombre del lugar:</label>
              <input type="text" value={nombreLugar} onChange={(e) => setNombreLugar(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tipo:</label>
              <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
            </div>
          </div>

          {/* Fila 2: Dirección completa */}
          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>

          {/* Fila 3: Ciudad y Estado */}
          <div className="form-row">
            <div className="form-group">
              <label>Ciudad:</label>
              <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Selecciona el estado</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Yucatán">Yucatán</option>
              </select>
            </div>
          </div>

          {/* Fila 4: Horarios */}
          <div className="form-row">
            <div className="form-group">
              <label>Horario de apertura:</label>
              <input type="time" value={horarioApertura} onChange={(e) => setHorarioApertura(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Horario de cierre:</label>
              <input type="time" value={horarioCierre} onChange={(e) => setHorarioCierre(e.target.value)} />
            </div>
          </div>

          {/* Fila 5: Precio */}
          <div className="form-group price-group">
            <label>Precio promedio (MXN):</label>
            <div className="price-inputs">
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={Math.floor(precio)}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ingresa el precio promedio"
              />
              <p>{parseFloat(precio).toFixed(2)} MXN</p>
            </div>
          </div>

          {/* Fila 6: Imagen */}
          <div className="form-group">
            <label>Imagen:</label>
            <div
              className="upload-area"
              onClick={() => document.getElementById('fileInput').click()}
              style={{ cursor: 'pointer' }}
            >
              {imagenFile ? (
                <img
                  src={URL.createObjectURL(imagenFile)}
                  alt="Previsualización"
                  style={{ width: '120px', borderRadius: '12px', marginBottom: '10px' }}
                />
              ) : (
                <p>📷 Haz click aquí para subir una imagen</p>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <button className="create-btn" onClick={handleAddEstablishment}>
            Añadir
          </button>

          {mensaje && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}
