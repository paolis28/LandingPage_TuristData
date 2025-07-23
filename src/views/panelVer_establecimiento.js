import React, { useState, useEffect } from 'react';
import { Search, MapPin, Edit3, Trash2, Eye } from 'lucide-react';
import '../styles/Panelverestablecimiento.css';

const PanelVerEstablecimiento = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  useEffect(() => {
    const token = localStorage.getItem('token'); // o donde lo guardes

    if (!token) {
      setError('No hay token de autenticación');
      setLoading(false);
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        //setEstablishments(data.establecimientos || []); // ajusta según respuesta
        setEstablishments(Array.isArray(data) ? data : data.establecimientos || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  // Filtrado igual
  const filteredEstablishments = establishments.filter(est => {
    const matchesSearch = est.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          est.ciudad?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todos' || est.tipo === filterType;
    return matchesSearch && matchesType;
  });

  const types = ['Todos', ...new Set(establishments.map(est => est.tipo))];

  if (loading) {
    return <div className="loading">Cargando establecimientos...</div>;
  }

  if (error) {
    return <div className="error">Error al cargar establecimientos: {error}</div>;
  }
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Hola Alfredo</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-btn">Agregar establecimiento</button>
          <button className="sidebar-btn active">Ver Establecimiento</button>
          <button className="sidebar-btn">Perfil</button>
          <button className="sidebar-btn">Cerrar sesión</button>
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
          <h2>Mis Establecimientos</h2>

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
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('hovered');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('hovered');
              }}
            >
              <div className="establishment-image-wrapper">
                <img 
                  src={establishment.imagen}
                  alt={establishment.nombre}
                  className="establishment-image"
                />
                {/* <img src={establecimiento.imagen} /> */}

                {/* <img 
                  src={`https://turistdata-back.onrender.com/uploads/admin_${establishment.id_administrador}/${establishment.imagen}`}
                  alt={establishment.nombre}
                  className="establishment-image"
                /> */}
                <div className="establishment-type">
                  {establishment.tipo}
                </div>
              </div>

              <div className="establishment-content">
                <h3>{establishment.nombre}</h3>

                <div className="establishment-location">
                  <MapPin size={16} />
                  <p>{establishment.direccion}</p>
                </div>

                <p className="establishment-city">{establishment.ciudad}</p>

                <p className="establishment-description">{establishment.descripcion}</p>

                <div className="establishment-footer">
                  <div>
                    <p>{establishment.telefono}</p>
                    <p>{establishment.email}</p>
                  </div>

                  <div className="establishment-actions">
                    <button className="btn eye-btn">
                      <Eye size={16} />
                    </button>
                    <button className="btn edit-btn">
                      <Edit3 size={16} />
                    </button>
                    <button className="btn delete-btn">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {filteredEstablishments.length === 0 && (
          <div className="empty-state">
            <h3>No se encontraron establecimientos</h3>
            <p>Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PanelVerEstablecimiento;
