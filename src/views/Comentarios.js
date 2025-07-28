import React, { useState, useEffect } from 'react';
import { Search, MapPin, Edit3, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Comentarios.css';

const PanelVerComentarios = () => {
  const [email, setEmail] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.email) setEmail(userData.email);
      } catch (e) {
        console.error('Error parsing userData from localStorage:', e);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setError('No hay token de autenticación');
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setLoading(true);
    setError(null);

    fetch('https://turistdata-back.onrender.com/api/establecimientos/admin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem('userData');
          navigate('/login');
          throw new Error('Sesión expirada');
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEstablishments(Array.isArray(data) ? data : data.establecimientos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching establishments:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleDeleteEstablishment = async (id) => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este establecimiento?')) {
      try {
        const response = await fetch(`https://turistdata-back.onrender.com/api/establecimientos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setEstablishments(prev => prev.filter(est => est.id !== id));
          if (selectedEstablishment?.id === id) {
            setSelectedEstablishment(null);
            setComments([]);
          }
        } else {
          throw new Error('Error al eliminar establecimiento');
        }
      } catch (error) {
        console.error('Error deleting establishment:', error);
        setError('Error al eliminar establecimiento');
      }
    }
  };

  const fetchComments = async (establishmentId) => {
    const token = getAuthToken();
    try {
      const res = await fetch(`https://turistdata-back.onrender.com/api/comentario/establecimiento?establecimiento_id=${establishmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener los comentarios');

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
      setComments([]);
    }
  };

  const handleSelectEstablishment = (est) => {
    setSelectedEstablishment(est);
    fetchComments(est.id);
  };

  const filteredEstablishments = establishments.filter(est => {
    const matchesSearch =
      est.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.ciudad?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todos' || est.tipo === filterType;
    return matchesSearch && matchesType;
  });

  const types = ['Todos', ...new Set(establishments.map(est => est.tipo))];

  if (loading) return <div className="loading">Cargando establecimientos...</div>;

  if (error) {
    return (
      <div className="error">
        <p>Error al cargar establecimientos: {error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Hola {email}</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-btn" onClick={() => navigate('/crear')}>Agregar establecimiento</button>
          <button className="sidebar-btn">Agregar eventos</button>
          <button className="sidebar-btn active">Ver Establecimiento</button>
          <button className="sidebar-btn">Perfil</button>
          <button className="sidebar-btn" onClick={handleLogout}>Cerrar sesión</button>
          <button className="sidebar-btn">Acerca de</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="logo-container">
            <div className="logo-icon"><span>T</span></div>
            <h1>TuristData</h1>
          </div>
        </header>

        <section className="search-filter">
          <h2>Mis Establecimientos ({establishments.length})</h2>
          <div className="search-filter-controls">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por nombre o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="type-select"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="establishments-grid">
          {filteredEstablishments.map(est => (
            <div
              key={est.id}
              className="establishment-card"
              onClick={() => handleSelectEstablishment(est)}
            >
              <div className="establishment-image-wrapper">
                <img
                  src={est.imagen || '/placeholder-image.jpg'}
                  alt={est.nombre}
                  className="establishment-image"
                  onError={(e) => e.target.src = '/placeholder-image.jpg'}
                />
                <div className="establishment-type">{est.tipo}</div>
              </div>
              <div className="establishment-content">
                <h3>{est.nombre}</h3>
                <div className="establishment-location">
                  <MapPin size={16} />
                  <p>{est.direccion}</p>
                </div>
                <p>{est.ciudad}, {est.estado}</p>
                {est.horario && <p><strong>Horario:</strong> {est.horario}</p>}
                {est.precio && <p><strong>Precio:</strong> ${est.precio} MXN</p>}
                <div className="establishment-actions">
                  <button className="btn eye-btn" title="Ver detalles"><Eye size={16} /></button>
                  <button className="btn edit-btn" title="Editar"><Edit3 size={16} /></button>
                  <button className="btn delete-btn" title="Eliminar" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEstablishment(est.id);
                  }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {selectedEstablishment && (
        <section className="comments-section">
            <div className="comments-header">
            <img
                src={selectedEstablishment.imagen || '/placeholder-image.jpg'}
                alt={selectedEstablishment.nombre}
                className="comments-image"
            />
            <div>
                <h2>{selectedEstablishment.nombre}</h2>
                <p>{selectedEstablishment.ciudad}, {selectedEstablishment.estado}</p>
            </div>
            </div>

            <h3>Comentarios</h3>

            {comments.length > 0 ? (
            <ul className="comments-list">
                {comments.map(comment => (
                <li key={comment.id_comentarios} className="comment-item">
                    <p><strong>{comment.nombre}</strong></p>
                    <p>{comment.comentario}</p>
                    <p>⭐ {comment.estrellas_calificacion}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p>No hay comentarios disponibles.</p>
            )}
        </section>
        )}

      </main>
    </div>
  );
};

export default PanelVerComentarios;
