import React, { useState } from "react";


function fetchUsers(){
    fetch(`/usuarios`)
    .then(response => response.json())
}

function editPlayer(id){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data={"username": username, "password": password}

    fetch(`/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response =>response.text())
    .then(text => {
        if(text==="SUCCESS"){
            fetchPlayers();
        }
        else{
            alert("Error")
        }
    })
}

function deleteUser(id){
    fetch(`/usuario/${id}`, {
        method: 'DELETE',
    }).then(response =>response.text())
    .then(text => {
        if(text==="SUCCESS"){
            fetchUsers();
        }
        else{
            alert("Error")
        }
    })
}

function create_User(){
    var username = document.getElementById("username").value;
    var email =document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data={"username": username,"email":email, "password": password}

    fetch(`usuarios`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response =>response.text())
    .then(text => {
        if(text==="SUCCESS"){
            fetchUsers();
        }
        else{
            alert("Error")
        }
    })


}
//crear funciones editar y eliminar jugador




fetchUsers()

