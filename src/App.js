import './App.css';

import LoginPage from './componentes/LoginPage';
import { useState } from 'react';
import RegistroPage from './componentes/RegistroPage';

import Main from './componentes/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisLogin from './componentes/RegisLogin';
import HomePage from './componentes/HomePage';



function App() {

  return (
    <div className="App">
      <div className='general'>
        <Router>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/main' element={<Main />}/>
          </Routes>
        </Router>
      </div>
      
    </div>
  );
}





export default App;
