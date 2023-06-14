import React from "react";
import '../stylesheets/Publicacion.css'
function Publicacion (props,{setNumLike,numlike}) {
    return(
    <div className="contenedor-publicacion">
        <img className="imagen-planta" 
    src={require(`../imagenes/${props.imagen}.jpg`)}
    alt="planta"></img>
    <div className="contenedor-texto-planta">
        <p className="nombre-planta">{props.nombre}</p>
        <p className="texto-planta">{props.texto}</p>
    </div>
    <div className="contenedor-comentarios">
        {props.comentarios}
    </div>
    <div className="contenedor-boton">
        <button
            className="Like"
            onClick={setNumLike}>
                Like
        </button>
        <div className='contador'>
            {numlike}
        </div>
    </div>
    
    </div>
    
    )
}


export default Publicacion;