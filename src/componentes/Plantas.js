
function fetchPlants(){
    fetch(`/plantas`)
    .then(response => response.json())
    .then(plantas => {
        const plantTable = document.getElementById('tabla-jardin');
        const tbody = plantTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        plant.forEach(plant => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${plant.username} <td>
            <td> ${plant.especie} <td>
            <td> ${plant.edad_inicial} <td>
            <td> 
            <button type = "button" onclick=editPlayer(${plant.id})>edit</button>
            <button type = "button" onclick=deletePlayer(${plant.id})>delete</button> <td>
            `;
            tbody.appendChild(row);
        });
    })
}

function editPlant(id){
    var username = document.getElementById("username").value;
    var especie = document.getElementById("especie").value;
    var edad_inicial = document.getElementById("edad_inicial")
    var data={"username": username, "especie": especie, "edad_inicial": edad_inicial}

    fetch(`/planta/${id}`, {
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

function deletePlant(id){
    fetch(`/planta/${id}`, {
        method: 'DELETE',
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

function create_plant(){
    var username = document.getElementById("username").value;
    var especie = document.getElementById("especie").value;
    var edad_inicial = document.getElementById("edad_inicial")
    var data={"username": username, "especie": especie, "edad_inicial": edad_inicial}

    fetch(`plantas`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response =>response.text())
    .then(text => {
        if(text==="SUCCESS"){
            fetchPlants();
        }
        else{
            alert("Error")
        }
    })


}

fetchPlants()

