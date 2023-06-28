import './App.css';
import LoginPage from './componentes/LoginPage';
import { useState } from 'react';
import RegisterPage from './componentes/RegisterPage';
import { UserProvider } from './UserContext';
import Main from './componentes/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisLogin from './componentes/RegisLogin';
import HomePage from './componentes/HomePage';

import React from 'react';
import RegistroPage from './componentes/RegistroPage';



function App() {

  return (
    <div className="App">
      <UserProvider>
      <div className='general'>
        <Router>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path='/main' element={<Main />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
          </Routes>
        </Router>
      </div>
      </UserProvider>
    </div>
  );
}


export default App;
