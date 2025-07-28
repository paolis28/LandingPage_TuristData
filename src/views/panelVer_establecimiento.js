import React, { useState, useEffect } from 'react';
import { Search, MapPin, Edit3, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Panelverestablecimiento.css';

const PanelVerEstablecimiento = () => {
  const [email, setEmail] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');
  
  const navigate = useNavigate();

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

  useEffect(() => {
    // Leer correo de usuario del localStorage al montar
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
    const token = getAuthToken(); // CAMBIADO: usar la función para obtener el token

    if (!token) {
      setError('No hay token de autenticación');
      setLoading(false);
      // Redirigir al login si no hay token
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
        'Authorization': `Bearer ${token}`, // Asegurar formato correcto
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Response status:', response.status); // Debug
        if (response.status === 401) {
          // Token expirado o inválido
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
        console.log('Data received:', data); // Debug
        setEstablishments(Array.isArray(data) ? data : data.establecimientos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching establishments:', err); // Debug
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
          // Remover el establecimiento de la lista local
          setEstablishments(prev => prev.filter(est => est.id !== id));
        } else {
          throw new Error('Error al eliminar establecimiento');
        }
      } catch (error) {
        console.error('Error deleting establishment:', error);
        setError('Error al eliminar establecimiento');
      }
    }
  };

  const filteredEstablishments = establishments.filter(est => {
    const matchesSearch =
      est.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.ciudad?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todos' || est.tipo === filterType;
    return matchesSearch && matchesType;
  });

  const types = ['Todos', ...new Set(establishments.map(est => est.tipo))];

  if (loading) {
    return <div className="loading">Cargando establecimientos...</div>;
  }

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
          <button 
            className="sidebar-btn"
            onClick={() => navigate('/crear')}
          >
            Agregar establecimiento
          </button>
          <button className="sidebar-btn">Agregar eventos</button>
          <button className="sidebar-btn active">Ver Establecimiento</button>
          <button className="sidebar-btn">Perfil</button>
          <button className="sidebar-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <button className="sidebar-btn">Acerca de</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>T</span>
            </div>
            <h1>TuristData</h1>
          </div>
        </header>

        <p className="subtitle">
          Te conecta con los sabores y paisajes de toda la República.
        </p>

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
          {filteredEstablishments.map(establishment => (
            <div
              key={establishment.id}
              className="establishment-card"
              onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
            >
              <div className="establishment-image-wrapper">
                <img
                  src={establishment.imagen || '/placeholder-image.jpg'}
                  alt={establishment.nombre}
                  className="establishment-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="establishment-type">{establishment.tipo}</div>
              </div>

              <div className="establishment-content">
                <h3>{establishment.nombre}</h3>

                <div className="establishment-location">
                  <MapPin size={16} />
                  <p>{establishment.direccion}</p>
                </div>

                <p className="establishment-city">{establishment.ciudad}</p>
                <p className="establishment-city">{establishment.estado}</p>

                {establishment.horario && (
                  <p className="establishment-schedule">
                    <strong>Horario:</strong> {establishment.horario}
                  </p>
                )}

                {establishment.precio && (
                  <p className="establishment-price">
                    <strong>Precio promedio:</strong> ${establishment.precio} MXN
                  </p>
                )}

                <div className="establishment-footer">
                  <div className="establishment-actions">
                    <button className="btn eye-btn" title="Ver detalles">
                      <Eye size={16} />
                    </button>
                    <button className="btn edit-btn" title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button 
                      className="btn delete-btn" 
                      title="Eliminar"
                      onClick={() => handleDeleteEstablishment(establishment.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {filteredEstablishments.length === 0 && establishments.length > 0 && (
          <div className="empty-state">
            <h3>No se encontraron establecimientos</h3>
            <p>Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}

        {establishments.length === 0 && !loading && (
          <div className="empty-state">
            <h3>No tienes establecimientos registrados</h3>
            <p>
              <button 
                onClick={() => navigate('/crear')}
                className="btn primary-btn"
              >
                Agregar tu primer establecimiento
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PanelVerEstablecimiento;