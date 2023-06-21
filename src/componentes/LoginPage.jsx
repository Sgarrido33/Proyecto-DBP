import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import logo from '../imagenes/logo.png';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      });

      if (response.data.success) {
        console.log('Inicio de sesión exitoso:', response.data);
        window.location.href = '/menu';
      } else {
        console.log('Error durante el inicio de sesión:', response.data.error);
        setErrorMessage('Error. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('Error. Por favor, verifica tus credenciales.');
    }
  };


  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Puedes iniciar tu sesión aquí</h1>
        <form onSubmit={handleLogin} className="login-form">
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <p className="signup-link">¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
