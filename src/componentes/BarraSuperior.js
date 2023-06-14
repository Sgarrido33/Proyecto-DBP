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
                <div className="contenedor-opcion">
                    <p><a href="/Jardin.js">Mi Jardin</a></p>
                </div>
                <div className="contenedor-opcion">
                    <p><a href="/Logros.js"></a>Logros</p>
                </div>
                <div className="contenedor-opcion">
                    <p><a href="/Publicaciones.js"></a>Publicaciones</p>
                </div>
            </div>
        </div>
    )
}

export default BarraSuperior;