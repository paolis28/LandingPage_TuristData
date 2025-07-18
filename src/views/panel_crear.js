import React, { useState } from 'react';
import '../styles/Panelestablecimiento.css';

export default function PanelCrear() {
  const [userName] = useState('Alfredo');
  const [nombreLugar, setNombreLugar] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState('');
  const [horario, setHorario] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleAddEstablishment = async () => {
    if (!imagenFile) {
      setMensaje(' Debes seleccionar una imagen');
      return;
    }

    const token = localStorage.getItem('token'); 

    if (!token) {
      setMensaje(' No se encontró el token de autenticación');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombreLugar);
    formData.append('direccion', direccion);
    formData.append('ciudad', ciudad);
    formData.append('tipo', tipo);
    formData.append('estado', estado);
    formData.append('horario', horario);
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
        setMensaje(' Establecimiento registrado con éxito');
        limpiarCampos();
      } else {
        const errorData = await response.json();
        console.error('Error al registrar:', errorData);
        setMensaje(' Error al registrar el establecimiento');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje(' No se pudo conectar con el servidor');
    }
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleEliminate = () => {
    console.log('Eliminar establecimiento');
    setMensaje('Función de eliminación aún no implementada');
  };

  const limpiarCampos = () => {
    setNombreLugar('');
    setDireccion('');
    setCiudad('');
    setTipo('');
    setEstado('');
    setHorario('');
    setPrecio('');
    setImagenFile(null);
  };

  return (
    <div className="dashboard-establishment-container">
      <div className="sidebar">
        <div className="profile-section">
          <h2>Hola {userName}</h2>
        </div>

        <div className="menu-sidebar">
          <div className="menu-item-sidebar"><span>Agregar establecimiento</span></div>
          <div className="menu-item-sidebar"><span>Ver Establecimiento</span></div>
          <div className="menu-item-sidebar"><span>Perfil</span></div>
          <div className="menu-item-sidebar"><span>Cerrar sesión</span></div>
          <div className="menu-item-sidebar"><span>Acerca de</span></div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>TuristData</h1>
          <p>Te conecta con los sabores y paisajes de toda la República.</p>
        </div>

        <div className="form-section">
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
              <option value="Chiapas">Chiapas</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Yucatán">Yucatán</option>
            </select>
          </div>

          <div className="form-group">
            <label>Horario:</label>
            <input type="text" value={horario} onChange={(e) => setHorario(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Precio promedio:</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Imagen:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imagenFile && <p> Archivo seleccionado: {imagenFile.name}</p>}
          </div>

          <button className="create-btn" onClick={handleAddEstablishment}>
            Añadir
          </button>

          {mensaje && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{mensaje}</p>}
        </div>

        <div className="establishment-status">
          <h3>Aún No has Registrado Ningún Establecimiento</h3>
          <p>Haz Click en el Botón Para Comenzar</p>

          <div className="action-buttons">
            <button className="action-btn eliminate-btn" onClick={handleEliminate}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
