import React, { useState, useEffect } from "react";
import axios from "axios";
import '../stylesheets/Plantas.css';

function Plantas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/plantas");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editPlant = async (id) => {
    try {
      var username = document.getElementById("username").value;
      var especie = document.getElementById("especie").value;
      var edad_inicial = document.getElementById("edad_inicial").value
      var data={"username": username, "especie": especie, "edad_inicial": edad_inicial}

    fetch(`http://127.0.0.1:5000/planta/${id}`, {
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
      const response = await axios.delete(`http://127.0.0.1:5000/plantas/${id}`);
  
      if (response.status === 200) {
        fetchData(); // Fetch updated data
      } else {
        throw new Error("Error deleting plant");
      }
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("Error al eliminar planta");
    }
  };
  

  const createPlant = async () => {
    try {
      var username = document.getElementById("username").value;
    var especie = document.getElementById("especie").value;
    var edad_inicial = document.getElementById("edad_inicial").value;
    var data={"username": username, "especie": especie, "edad_inicial": edad_inicial}

    const response = await axios.post("http://127.0.0.1:5000/plantas",data);
    if (response.status === 200) {
      fetchData();
    } else {
      throw new Error("Error al crear planta");
    }
  } catch (error) {
    console.error("Error creating plant:",error);
    alert("Error al crear planta")
  }

    
}
  return (
    <div>
    <div className="Jardin">
        <div className="form">
        <label htmlFor="username">Username:</label>
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
            <th>Fecha de registro</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.username}</td>
              <td>{plant.especie}</td>
              <td>{plant.edad_inicial}</td>
              <td>{plant.fecha_registro}</td>
              <td>{plant.cantidad}</td>
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