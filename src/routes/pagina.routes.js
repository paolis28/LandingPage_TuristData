import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Register from '../views/Register';
import Login from '../views/Login_admin';
import Contacto from '../views/Contacto';
const Rutas =() =>{
  return (

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
 
  );
}

export default Rutas;