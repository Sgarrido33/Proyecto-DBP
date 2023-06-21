import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/RegistroPage.css';
import logo from '../imagenes/logo.png';
import axios from 'axios';

function RegistroPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const emailExistsResponse = await axios.get(`http://127.0.0.1:5000/usuarios?email=${email}`);
      if (emailExistsResponse.data.exists) {
        setMessage('El correo electrónico ya ha sido registrado');
        return;
      }

      const registerResponse = await axios.post('http://127.0.0.1:5000/usuarios', {
        username,
        email,
        password
      });
  
      if (registerResponse.data.error) {
        if (registerResponse.data.error === 'Email already exists') {
          setMessage('El correo electrónico ya ha sido registrado');
        } else {
          setMessage('Error durante el registro');
        }
      } else {
        setMessage('Registro exitoso');
        console.log('Registro exitoso:', registerResponse.data);
        window.location.href = '/login';
      }
    } catch (error) {
      setMessage('Error durante el registro');
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="registro-title">Puedes registrarte aquí</h1>
        {message && <p className="message">{message}</p>}
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



