import './App.css';
import Publicaciones from './componentes/Publicaciones';
import Menu from './componentes/Menu';
import Logro from './componentes/Logro';
import LoginPage from './componentes/LoginPage';
import BarraSuperior from './componentes/BarraSuperior';
import { useState } from 'react';
import RegisterPage from './componentes/RegisterPage';
import Plantas from './componentes/Plantas';


function App() {
  const [showJardin, setShowJardin] = useState(true);
  const [showLogros, setShowLogros] = useState(false);
  const [showPublicaciones,setShowPublicaciones]=useState(false)


  return (
    <div className="App">
      <div className='izquierda'>
        <div className='barra-superior'>
        <BarraSuperior/>
          <button onClick={() => setShowJardin(!showJardin)}>
          Mostrar/Ocultar Jardin
          </button>
          <button onClick={() => setShowLogros(!showLogros)}>
          Mostrar/Ocultar Logros
          </button>
          <button onClick={() => setShowPublicaciones(!showPublicaciones)}>
          Mostrar/Ocultar Publicaciones
          </button>
        </div>
        <div className='Contenido'>
          <div className='Jardin'>
            {showJardin && <Plantas />}
          </div>

          <div className='Logros'>
  
          </div>
          
        </div>
      </div>
      <div className='Menu'>
        <Menu
        foto='incognito'
        user='user1234'
        />
      </div>
    </div>
  );
}



function Logros(){
  return(
      <div className="logros">
          <div className="contenedor-logros-titulo">
              <h4>Logros recientes</h4>
          </div>
          <div className="contenedor-contenido">
              <Logro
                  autor='user1234'
                  imagen='planta1'
              />
              <Logro
                  autor='user1234'
                  imagen='planta1'
              />
              <Logro
                  autor='user1234'
                  imagen='planta1'
              />
          </div>
      </div>
  )
}

export default App;
