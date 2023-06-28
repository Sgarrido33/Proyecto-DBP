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
<<<<<<< HEAD
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
=======
>>>>>>> 941a2490794c5000f5dd216caed57efd25018ddb
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
