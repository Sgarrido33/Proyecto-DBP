import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegistroPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/usuarios', {
        username,
        email,
        password
      });
      
      // Aquí puedes manejar la respuesta del servidor si es necesario
      
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      // Aquí puedes manejar el error en caso de que ocurra
      
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <div>
      <h1>Página de registro</h1>
      <form onSubmit={handleRegister}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
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
        <button type="submit">Registrarse</button>
      </form>
      <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
  );
}

export default RegistroPage;