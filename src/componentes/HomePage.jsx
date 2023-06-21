import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/HomePage.css';
import logo from '../imagenes/logo.png';
import background from '../imagenes/BG.jpg';

function HomePage() {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="home-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="home-content">
          <h1 className="home-title">PlantPals</h1>
          <p className="home-description">Bienvenido a la página de inicio.</p>
          <p className="home-description">Logeate para poder acceder al menú y comenzar a interactuar.</p>
          <div className="home-links">
            <p>No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
