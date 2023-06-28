import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../stylesheets/Menu.css';

function Menu(props) {
    const { user, logoutUser } = useContext(UserContext);
    if (!user) {
        return null; // Otra opción es mostrar un mensaje de carga o redireccionar al inicio de sesión
    }
    return(
        <div className="contenedor-menu">
            <div className="contenedor-menu-foto">
            <img 
            className='foto-perfil'
            src={require(`../imagenes/perfil-${props.foto}.png`)}
            alt='fotoperfil'/>
            </div>
            <div className='contenedor-menu-user'>
                <p className="user">{user.email}</p>
            </div>
            <div className="contenedor-menu-opciones">
                <a href="/Publicaciones()"><p>Mis Publicaciones</p></a>
                <a href="/Jardin()"><p>Mis Plantas</p></a>
                <a href="/Logros()"><p>mis Logros</p></a>
                <p>Configuracion</p>
                <p className="CerrarSesion">
                    <button onClick={logoutUser}>Cerrar Sesion</button></p>
            </div>

        </div>
    )
}

export default Menu;