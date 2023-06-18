import React, { useState, useEffect } from "react";
import axios from "axios";
import '../stylesheets/Plantas.css'
function Plantas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/plantas");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editPlant = async (id) => {
    try {
      // Aquí puedes realizar la solicitud PUT a la API para editar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Recuerda enviar los datos en el cuerpo de la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la edición
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
            fetchData();
        }
        else{
            alert("Error")
        }
    })
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlant = async (id) => {
    try {
      // Aquí puedes realizar la solicitud DELETE a la API para eliminar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la eliminación
      fetch(`/planta/${id}`, {
        method: 'DELETE',
    }).then(response =>response.text())
    .then(text => {
        if(text==="SUCCESS"){
            fetchData();
        }
        else{
            alert("Error")
        }
    })
    } catch (error) {
      console.error(error);
    }
  };

  const createPlant = async () => {
    try {
      // Aquí puedes realizar la solicitud POST a la API para crear una nueva planta
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Recuerda enviar los datos en el cuerpo de la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la creación
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
            fetchData();
        }
        else{
            alert("Error")
        }
    })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div className="Jardin">
        <div className="form">
        <label htmlFor="username">Nombre:</label>
        <input type="text" id="username" />
        <label htmlFor="especie">Especie:</label>
        <input type="text" id="especie" />
        <label htmlFor="edad_inicial">Edad Inicial:</label>
        <input type="text" id="edad_inicial" />
        <button type="button" onClick={createPlant}>
        Añadir Planta </button>
        
        
        </div>
      <table id="tabla-jardin">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Edad Inicial</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.username}</td>
              <td>{plant.especie}</td>
              <td>{plant.edad_inicial}</td>
              <td>
                <button type="button" onClick={() => editPlant(plant.id)}>
                  Editar
                </button>
                <button type="button" onClick={() => deletePlant(plant.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
          </div>

        )
          }



export default Plantas;