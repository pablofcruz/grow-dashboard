import React from 'react';
import { NavLink,Route, Routes } from 'react-router-dom';
import './Navbar.css';
import Login from '../pages/Login';
import Register from '../pages/Register';


const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/" exact>
            Home
          </NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/login">
            Iniciar Sesión
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/register">
            Registrarse
          </NavLink>
        </li>
      </ul>
     
    </nav>
    <Routes>
          <Route exact path="/">
         
          </Route>
          <Route path="/login" element={<Login/>}>
            
          </Route>
          <Route path="/register" element={<Register/>}>
            
            </Route>
        </Routes>
    </div>
    
    
  );
};

export default Navbar;
