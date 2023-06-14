import React, { useEffect, useState } from 'react';

import '../stylesheets/Publicacion.css'

function Publicacion (props, like, numlike) {
    return(
    <div className="contenedor-publicacion">
        <img className="imagen-planta" 
    src={require(`../imagenes/${props.imagen}.jpg`)}
    alt="planta"></img>
    <div className="contenedor-texto-planta">
        <p className="nombre-planta">{props.username}</p>
        <p className="texto-planta">{props.descrip}</p>
    </div>
    <div className="contenedor-comentarios">
        <p>Comentarios:</p>
        {props.comments}
    </div>
    <div className="contenedor-boton">
        <button
            className="Like"
            onClick={like}>
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