
import './App.css';
import Publicacion from './componentes/Publicacion';
import Menu from './componentes/Menu';
import { useState } from 'react';
import BarraSuperior from './componentes/BarraSuperior';

function App() {

  return (
    <div className="App">
      <div>
        <div className='barra-superior'>
        <BarraSuperior/>
      </div>
      <br></br>
      <div className='Contenido'>
      <Publicacion
        imagen={'planta1'}
        username={'Planta'}
        descrip={'blablabla'}
        comments={'Ok'}
      />
      <Publicacion
        imagen={'planta1'}
        username={'Planta'}
        descrip={'blablabla'}
        comments={'Esta bien'}
      />
      <Publicacion
        imagen={'planta1'}
        username={'Planta'}
        descrip={'blablabla'}
        comments={''}
      />
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
