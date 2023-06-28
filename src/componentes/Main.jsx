import React,{ useState,setState, useContext } from 'react';
import { UserContext } from '../UserContext';
import Plantas from './Plantas';
import Publicaciones from './Publicaciones';
import BarraSuperior from './BarraSuperior';
import '../stylesheets/main.css'
import Menu from './Menu';
import Logro from './Logro';
import { Link } from 'react-router-dom';

function Main() {
    const [showJardin, setShowJardin] = useState(false);
    const [showLogros, setShowLogros] = useState(false);
    const [showPublicaciones,setShowPublicaciones]=useState(false);

    return(
      <div>
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
            <div className='Jardin'>{showJardin && <Plantas />}</div>
            <div className='Publicaciones'>{showPublicaciones &&<Publicaciones/>}</div>
          </div>
        </div>
        <div className='Menu'>
          <Menu
          foto='incognito'
          />
        </div>
      </div>  
    )
}


export default Main