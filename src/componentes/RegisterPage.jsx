import React from "react";
import '../stylesheets/LoginPage.css'

function RegisterPage(){
    return(
        <div className="contenedor">
            <h1>Crear Cuenta</h1>

            <form action="/usuarios/add" method="POST">
                <label for="username">Usuario: </label>
                <input type="text" id="username" name="username"/>
                <br></br>
                <br></br>
                <label for="email">Email: </label>
                <input type="text" id="email" name="email"/>
                <br></br>
                <br></br>
                <label for="lastname">Password: </label>
                <input type="password" id="password" name="password"/>
                <br></br>
                <br></br>

            <button type="button" onclick="register()">Crear Cuenta</button>

            </form>
        </div>
    )
}

export default RegisterPage;