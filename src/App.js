
import './App.css';
import Publicacion from './componentes/Publicacion';
import Menu from './componentes/Menu';
import { useState } from 'react';
import BarraSuperior from './componentes/BarraSuperior';

function App() {
  const [numlike, setNumLike] = useState(0);

  const like = () => {
    setNumLike(numlike + 1);
  }  
  
  return (
    <div className="App">
      <BarraSuperior/>
      <br></br>
      <div className='Contenido'>
      <Publicacion
        imagen={'planta1'}
        nombre={'Planta'}
        texto={'blablabla'}
      />
      </div>
      <div className='Menu'>
        <Menu
        imagen={'perfil1'}
        usuario={'user1234'}
        />
      </div>

    </div>
  );
}

export default App;
