import React from "react";
import '../stylesheets/BarraSuperior.css'
import Logo from "./Logo";
import { Link } from 'react-router-dom';
import logo from '../imagenes/PlantPals_Logo_v1.png';
//perfil visible

function BarraSuperior (props){
    return(
        <div className="contenedor-barra">
            <div className="contenedor-logo">
            <img src={logo} alt="Logo" className="logo" />
            </div>
            
            <div className="contenedor-texto">
                 <p className="NomApp">PlantPals</p>
            </div>
            <div className="contenedor-opciones">
                <button onClick="window.location.href='/Jardin.js'">Mi Jardin</button>
                <button onClick="window.location.href='/Logros.js'">Logros</button>
                <button onClick="window.location.href='/Publicaciones.js'">Publicaciones</button>
            </div>
        </div>
        
    )
}


export default BarraSuperior;