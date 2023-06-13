import React from "react";
import '../stylesheets/Perfil.css'
//perfil visible
function Perfil (props){
    return(
        <div className="contenedor-perfil">
            <img className="foto-perfil" src={require(`../imagenes/${props.imagen}.jpg`)} alt="fotoperfil"/>
            <div className="contenedor-texto">
                 <p className="usuario">{props.usuario}</p>
                 <p className="email">{props.email}</p>
            </div>
        </div>
    )
}

export default Perfil;