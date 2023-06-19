import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistroPage.css';
import logo from '../imagenes/logo.png';
import axios from 'axios';

function RegistroPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Lógica para enviar los datos de registro al backend usando axios o cualquier otra librería de tu elección
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
    <div className="registro-page">
      <div className="registro-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="registro-title">Puedes registrarte aquí</h1>
        <form onSubmit={handleRegister} className="registro-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button type="submit" className="registro-button">Registrarse</button>
        </form>
        <p className="login-link">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}

export default RegistroPage;