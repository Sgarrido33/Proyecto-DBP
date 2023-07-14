import React from 'react';
import '../stylesheets/Menu.css';
import { useUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';

function Menu(props) {
    const { user, logoutUser } = useUser()

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
                <Link to={"/main"}><p>Publicaciones</p></Link>
                <Link to={"/mis-publicaciones"}><p>Mis Publicacioness</p></Link>
                <Link to={"/crear-publicacion"}><p>Crear Publicacion</p></Link>
             
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