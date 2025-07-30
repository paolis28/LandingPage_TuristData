import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Register from '../views/Register';
import Login from '../views/Login_admin';
import Contacto from '../views/Contacto';
import PanelAdmin from '../views/PanelAdmin';
import PanelEstablecimiento from '../views/panel_establecimiento';
import AvisoPrivacidad from '../views/avisoprivacidad';
import PanelCrear from '../views/panel_crear'; 
import PanelVerEstablecimiento from '../views/panelVer_establecimiento';
import PanelEventosEspeciales from '../views/Panel_eventosespeciales';
import PanelVerComentarios from '../views/Comentarios';
import Estadisticas from '../views/Estadisticas';

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<AvisoPrivacidad />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/dashboard" element={<PanelAdmin />} />
      <Route path="/dashestablecimiento" element={<PanelEstablecimiento />} />
      <Route path="/crear" element={<PanelCrear />} /> 
      <Route path="/verestablecimiento" element={<PanelVerEstablecimiento />} /> 
      <Route path="/crearevento" element={<PanelEventosEspeciales />} /> 
      <Route path="/vercomentarios" element={<PanelVerComentarios />} /> 
        <Route path="/Estadisticas" element={<Estadisticas />} />
    </Routes>
  );
};

export default Rutas;
