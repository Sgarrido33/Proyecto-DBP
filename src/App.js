
import './App.css';
import Publicacion from './componentes/Publicacion';
import Perfil from './componentes/Perfil';
import { useState } from 'react';

function App() {
  const [numlike, setNumLike] = useState(0);

  const like = () => {
    setNumLike(numlike + 1);
  }  

  return (
    <div className="App">
      <Perfil
      imagen={'planta1'}
      usuario={'user1234'}
      email={'user1234@hotmail.com'}
      />
      
      <Publicacion
        imagen={'planta1'}
        nombre={'Planta'}
        texto={'blablabla'}
      />
    </div>
  );
}

export default App;
