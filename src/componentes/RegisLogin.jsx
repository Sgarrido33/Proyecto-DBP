import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegistroPage from './RegistroPage';

function RegisLogin() {
  return (
    <div className="App">
      <div className='Contenido'>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default RegisLogin;