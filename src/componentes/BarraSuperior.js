import React from "react";
import '../stylesheets/BarraSuperior.css'
//perfil visible
function BarraSuperior (props){
    return(
        <div className="contenedor-barra">
            <img className="logo" src={require(`../imagenes/PlantPals_Logo_v1.png`)} alt="fotoperfil"/>
            <div className="contenedor-texto">
                 <p className="NomApp">PlantPals</p>
            </div>
            <div className="contenedor-opciones">
                <div className="contenedor-opcion">
                    <p>Mi Jardin</p>
                </div>
                <div className="contenedor-opcion">
                    <p>Logros</p>
                </div>
                <div className="contenedor-opcion">
                    <p>Publicaciones</p>
                </div>
                
            </div>
        </div>
    )
}

export default BarraSuperior;