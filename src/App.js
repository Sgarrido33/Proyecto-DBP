
import './App.css';
import Publicaciones from './componentes/Publicaciones';
import Menu from './componentes/Menu';
import Jardin from './componentes/Jardin';
import BarraSuperior from './componentes/BarraSuperior';
import { useState } from 'react';


function App() {

  return (
    <div className="App">
      <div>
        <div className='barra-superior'>
        <BarraSuperior/>
      </div>
      <br></br>
      <div className='Contenido'>
      </div>
      </div>
      <div className='Menu'>
        <Menu
        imagen={'perfil1'}
        user={'user1234'}
        />
      </div>
    </div>
  );
}

export default App;
