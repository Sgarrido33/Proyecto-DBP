import React from 'react';
import BotonLike from './BotonLike'
import '../stylesheets/Publicacion.css'
import Comentarios from './Comentarios';

function Publicacion (props) {
    const { datos }=props;
    const counter = <BotonLike/>;

    return(
    <div className="contenedor-publicacion">
        
        <div className="contenedor-texto-planta">
            {datos.map((publicacion) => (
            <p key={publicacion.id}>
                {publicacion.username}
                {publicacion.descript}
            </p>
            ))}
        </div>
        <div className="contenedor-comentarios">
            {datos.map((publicacion) => (
            <p key={publicacion.id}>
                Comentarios: 
                {publicacion.comentarios}
                <Comentarios/>
            </p>
            ))}
        </div>
        <div className="contenedor-boton">
            {counter}
        </div>
    </div>
    
    )
}


export default Publicacion;