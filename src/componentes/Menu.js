import React from "react";
import '../stylesheets/Menu.css'
function Menu(props) {
    return(
        <div className="contenedor-menu">
            <div className="contenedor-menu-foto">
            <img className="foto-perfil" src={require(`../imagenes/${props.imagen}.png`)} alt="fotoperfil"/>
            </div>
            <div classname='contenedor-menu-user'>
                {props.user}
            </div>
            <div className="contenedor-menu-opciones">
                <p>Mis Publicaciones</p>
                <p>Mis plantas</p>
                <p>mis Logros</p>
                <p>Configuracion</p>
                <p className="CerrarSesion">Cerrar Sesion</p>
            </div>

        </div>
    )
}
export default Menu;