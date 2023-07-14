import './App.css';
import React from 'react';
import LoginPage from './componentes/LoginPage';
import { UserProvider } from './UserContext';
import Main from './componentes/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './componentes/HomePage';
import RegistroPage from './componentes/RegistroPage';
import { AuthRouter } from './AuthRouter';
import { Layout } from './componentes/shared';
import CrearPublicacion from './componentes/CrearPublicacion';
import MisPublicaciones from './componentes/MisPublicaciones';



function App() {

  return (
    <div className="App">
      <UserProvider>
      <div className='general'>
        <Router>
          <AuthRouter>
            <Layout>
              <Routes>
                <Route path="/*" element={<HomePage />} />
                <Route path='/main' element={<Main />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />
                <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
                <Route path="/crear-publicacion" element={<CrearPublicacion />} />
              </Routes>
            </Layout>
          </AuthRouter>
        </Router>
      </div>
      </UserProvider>
    </div>
  );
}





export default App;
