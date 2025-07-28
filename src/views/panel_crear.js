import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Panelestablecimiento.css';

export default function PanelCrear() {
  const [email, setEmail] = useState('');
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

  // Función para verificar si el usuario está autenticado
  const checkAuth = () => {
    const token = getAuthToken();
    if (!token) {
      setMensaje('Sesión expirada. Redirigiendo al login...');
      setTimeout(() => {
        localStorage.removeItem('userData');
        navigate('/login');
      }, 2000);
      return false;
    }
    return true;
  };

  // Leer el correo del usuario desde localStorage al montar el componente
  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.email) setEmail(userData.email);
      } catch (error) {
        console.error('Error parsing userData:', error);
        navigate('/login');
      }
    } else {
      // Si no hay userData, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  const handleAddEstablishment = async () => {
    // Verificar autenticación antes de proceder
    if (!checkAuth()) {
      return;
    }

    if (!imagenFile) {
      setMensaje('Debes seleccionar una imagen');
      return;
    }

    const token = getAuthToken();

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
          'Authorization': `Bearer ${token}`, // Asegúrate de que el formato sea correcto
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Establecimiento creado:', data);
        setMensaje('Establecimiento registrado con éxito');
        limpiarCampos();
      } else if (response.status === 401) {
        // Token expirado o inválido
        setMensaje('Sesión expirada. Redirigiendo al login...');
        localStorage.removeItem('userData');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error al registrar:', errorData);
        setMensaje(errorData.error || 'Error al registrar el establecimiento');
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

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {email}</h2>
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
            className={`sidebar-btn ${isActive('/vercomentarios') ? 'active' : ''}`}
            onClick={() => navigate('/vercomentarios')}
          >
            Ver Comentarios
          </button>
          <button className="sidebar-btn" onClick={handleLogout}>
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
          <p>Te conecta con los sabores y paisajes de toda la República.</p>
        </div>

        <div className="form-card">
          <h2>Registrar Establecimiento</h2>

          <div className="form-group">
            <label>Nombre del lugar:</label>
            <input type="text" value={nombreLugar} onChange={(e) => setNombreLugar(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Ciudad:</label>
            <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Selecciona el estado</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
          </div>

          <div className="form-group">
            <label>Horario de apertura:</label>
            <input type="time" value={horarioApertura} onChange={(e) => setHorarioApertura(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Horario de cierre:</label>
            <input type="time" value={horarioCierre} onChange={(e) => setHorarioCierre(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Precio promedio (MXN):</label>
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
              style={{ marginTop: '10px', width: '100%' }}
            />
            <p>{parseFloat(precio).toFixed(2)} MXN</p>
          </div>

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