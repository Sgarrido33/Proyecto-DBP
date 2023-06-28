import React from "react";
import '../stylesheets/Menu.css';

function Menu(props) {
    return(
        <div className="contenedor-menu">
            <div className="contenedor-menu-foto">
            <img 
            className='foto-perfil'
            src={require(`../imagenes/perfil-${props.foto}.png`)}
            alt='fotoperfil'/>
            </div>
            <div classname='contenedor-menu-user'>
                <p className="user">{props.username}</p>
            </div>
            <div className="contenedor-menu-opciones">
                <a href="/Publicaciones()"><p>Mis Publicaciones</p></a>
                <a href="/Jardin()"><p>Mis Plantas</p></a>
                <a href="/Logros()"><p>mis Logros</p></a>
                <p>Configuracion</p>
                <p className="CerrarSesion">Cerrar Sesion</p>
            </div>

        </div>
    )
}

export default Menu;