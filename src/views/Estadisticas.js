import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';
import '../styles/Estadisticas.css';

const BASE_URL = 'https://tu-backend.com/api/prediccion';
const COMENTARIOS_URL = 'https://turistdata-back.onrender.com/api/comentario/establecimiento';

const groserias = [
  // Español - Insultos comunes
  "maldito", "malditos", "maldita", "malditas", "idiota", "estúpido", "estúpida", "imbécil", "imbéciles", "tonto", "tonta",
  "pendejo", "pendeja", "mierda", "mierder", "joder", "jodido", "jodida", "jodiendo", "chingar",
  "chingado", "chingada", "chingón", "chingona", "verga", "vergas", "culero", "culera", "cabron", "cabrón",
  "cabrona", "carajo", "coño", "hostia", "gilipollas", "zorra", "zorro", "bastardo", "bastarda",
  "cagada", "cagar", "cagón", "cagona", "maricón", "marica", "maricones", "picha", "pendejez", 
  "polla", "pajero", "pajera", "mamón", "mamona", "panocha", "concha", "culito", "culo", "culazo",
  "pinche", "huevón", "huevona", "webon", "webona", "pelotudo", "pelotuda", "boludo", "boluda",
  "güey", "wey", "ñero", "naco", "choto", "chota", "mierdero", "mierdoso", "mierdosa", "puta", "puto", 
  "putita", "putito", "perra", "perro", "perris", "petardo", "imbecil", "pendejazo", "pendejita",
  "estupides", "zanguango", "vago", "bruto", "bruja", "brujo",

  // Palabras sexuales ofensivas o vulgares
  "follar", "fornicar", "penetrar", "coger", "sexo", "cojer", "tragar", "mamar", "chupar", 
  "lamer", "tirar", "garchar", "meter", "sacar", "montar", "encular", "cachonda", "cachondo", 
  "caliente", "arder", "templar", "trancar", "vergazo", "chingazo", "culear", "culeado", 
  "culeada", "culeando", "nalgas", "nalga", "trasero", "traserito", "ano", "anal", "clítoris", 
  "vagina", "pene", "genitales", "testículos", "tetas", "pechos", "chichis", "boobies", 
  "boobs", "trasero", "culo", "culo grande",

  // Palabras ofensivas en inglés (comunes en textos mixtos o redes sociales)
  "fuck", "fucking", "fucker", "motherfucker", "shit", "bullshit", "asshole", "bastard", 
  "bitch", "son of a bitch", "dick", "dickhead", "cock", "pussy", "slut", "whore", 
  "jerk", "suck", "sucker", "retard", "retarded", "damn", "crap", "wanker", "twat", 
  "cum", "nigger", "nigga", "spic", "fag", "faggot",

  // Variantes con números o símbolos usados para evadir filtros
  "m4ldito", "put@", "p3ndejo", "p3rra", "estup1do", "c4bron", "mierd@", "j0der", "ch1ngar", 
  "m4m0n", "c4g4r", "cul3ro", "g1lip0llas", "z0rr@", "v3rg@", "idi0ta", "imb3cil",

  // Tu lista original
  'estupido', 'idiota', 'tonto', 'imbecil', 'maldito', 'mierda', 'cabron', 'puto', 'mamon', 'puta', 'pinché', 'pinche',
  'pendejo', 'hijo de puta', 'gilipollas', 'coño', 'chingar', 'verga', 'marica', 'maricon', 'zorra', 'perra', 'chingadera', 'pendejada', 'pendejadas', 'pendejo',
  'pendejos', 'pendeja', 'pendejas', 'huevon', 'huevona', 'huevones', 'huevonas'
];


const censurarComentario = (texto) => {
  if (!texto || typeof texto !== 'string') return texto;
  let censurado = texto;

  groserias.forEach(palabra => {
   const regex = new RegExp(`\\b${palabra}\\b`, 'gi');

    const reemplazo = '*'.repeat(palabra.length);
    censurado = censurado.replace(regex, reemplazo);
  });

  return censurado;
};

const Estadisticas = () => {
  const [data, setData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.token;
      } catch (error) {
        console.error('Error al parsear userData:', error);
        return null;
      }
    }
    return null;
  };

  const fetchComentarios = async () => {
    const token = getAuthToken();
    if (!token) {
      setError('No hay token de autenticación');
      return;
    }

    try {
      const res = await fetch(`${COMENTARIOS_URL}?establecimiento_id=1`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener los comentarios');

      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
      setComentarios([]);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  useEffect(() => {
    fetch('/data_restaurante_2015_2026.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rawData = result.data;
            const filteredData = rawData.filter((row) => {
              const fecha = new Date(row.fecha);
              const desde = new Date('2024-01-01');
              const hasta = new Date('2025-07-29');
              return fecha >= desde && fecha <= hasta;
            });

            const mappedData = filteredData.map((row) => ({
              fecha: row.fecha,
              visitas: Number(row.visitas || 0),
              busquedas: Number(row.busquedas || 0),
            }));

            setData(mappedData);
            setPredictedData(mappedData);
          },
        });
      });
  }, []);

  const fetchPrediction = async (endpoint) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      if (!res.ok) throw new Error('Error al obtener predicción');
      const prediction = await res.json();
      setPredictedData([...data, ...prediction]);
    } catch (error) {
      console.error(error);
      alert('Error al obtener predicción del servidor');
    } finally {
      setLoading(false);
    }
  };

  const calcularPromedioEstrellas = () => {
    const calificaciones = comentarios
      .map(c => Number(c.estrellas_calificacion))
      .filter(n => !isNaN(n));

    if (calificaciones.length === 0) return null;

    const suma = calificaciones.reduce((acc, val) => acc + val, 0);
    const promedio = suma / calificaciones.length;

    return {
      promedio: promedio.toFixed(1),
      cantidad: calificaciones.length
    };
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li> Inicio</li>
      
          <li> Cerrar sesion</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <input type="text" placeholder="Buscar..." />
         
        </header>

        <section className="stats-cards">
          <div className="card">Visitas en un Año<br /><strong>{data.length}</strong></div>
          <div className="card">Rango de fechas<br /><strong>2024 - 2025</strong></div>
          <div className="card">Datos cargados<br /><strong>{predictedData.length}</strong></div>
          {/* Eliminamos la tarjeta del promedio de estrellas de aquí */}
        </section>

        {loading && <p>Cargando predicción...</p>}

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" angle={-45} textAnchor="end" height={100} interval={30} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitas" stroke="#8884d8" name="Visitas" />
              <Line type="monotone" dataKey="busquedas" stroke="#82ca9d" name="Búsquedas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Aquí mostramos la tarjeta del promedio de estrellas justo debajo del gráfico */}
        {calcularPromedioEstrellas() && (
          <div className="card promedio-estrellas" style={{ marginTop: '20px', maxWidth: '200px' }}>
            <div className="estrellas-val">
              <strong>⭐ {calcularPromedioEstrellas().promedio}</strong>
            </div>
            <small>basado en {calcularPromedioEstrellas().cantidad} opiniones</small>
          </div>
        )}

        <section className="comentarios-section">
          <h3>Comentarios recientes de restaurantes</h3>
          <div className="comentarios-list">
            {comentarios.length === 0 ? (
              <p>No hay comentarios disponibles.</p>
            ) : (
              comentarios.map((comentario, index) => (
                <div
                  key={index}
                  className={`comentario-card ${comentario.tipo === 'negativo' ? 'negativo' : 'positivo'}`}
                >
                  <strong>{comentario.nombre || comentario.restaurante}</strong>
                  <span className="comentario-fecha">{comentario.fecha}</span>
                  <p>{censurarComentario(comentario.comentario || comentario.texto)}</p>
                  <p>⭐ {comentario.estrellas_calificacion ?? 'Sin calificación'}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Estadisticas;
