import React from "react"
import '../stylesheets/LoginPage.css'
import Logo from './Logo'
function LoginPage () {
    return (
    <div className = "contenedor">
        <Logo />
        <h1 className = "loginPage-title">Iniciar Sesion</h1>
        <form action="/login" >
            <label>Usuario: </label>
            <input type = "text" name= "username"></input>
            <br></br>
            <br></br>
            <label>Contraseña: </label>
            <input type= "password" name= "password"/>
            <br></br>
            <br></br>
            <button type="submit" variant="primary">Iniciar Sesion</button>
        </form>
        <p>¿No estas registrado?<a href="/Register">Registrate</a></p>
    </div>
    );
    }

export default LoginPage;