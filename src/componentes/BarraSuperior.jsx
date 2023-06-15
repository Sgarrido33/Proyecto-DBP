import React from "react";
import '../stylesheets/BarraSuperior.css'
//perfil visible

function BarraSuperior (props){
    
    return(
        <div className="contenedor-barra">
            <div className="contenedor-logo">
                <img className="logo" src={require(`../imagenes/PlantPals_Logo_v1.png`)} alt="fotoperfil"/>
            </div>
            
            <div className="contenedor-texto">
                 <p className="NomApp">PlantPals</p>
            </div>
            <div className="contenedor-opciones">
                <button onclick="window.location.href='/Jardin.js'">Mi Jardin</button>
                <button onClick="window.location.href='/Logros.js'">Logros</button>
                <button onClick="window.location.href='/Publicaciones.js'">Publicaciones</button>
            </div>
        </div>
        
    )
}


export default BarraSuperior;