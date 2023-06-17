import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para enviar datos de inicio de sesión al backend
    console.log('Iniciar sesión:', email, password);
  };

  return (
    <div>
      <h1>Página de inicio de sesión</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    </div>
  );
}

export default LoginPage;