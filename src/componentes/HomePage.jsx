import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Página de inicio</h1>
      <p>Bienvenido a la página de inicio.</p>
      <p>Puedes navegar a través del menú para acceder a otras secciones.</p>
      <p>No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
}

export default HomePage;