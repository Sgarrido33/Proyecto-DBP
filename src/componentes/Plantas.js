import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/Plantas.css";

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
      console.error("Error fetching data:", error);
    }
  };

  const editPlant = async (id) => {
    try {
      const username = document.getElementById("username").value;
      const especie = document.getElementById("especie").value;
      const edad_inicial = document.getElementById("edad_inicial").value;
      const data = { username, especie, edad_inicial };

      const response = await axios.put(
        `http://127.0.0.1:5000/planta/${id}`,
        data
      );
      if (response.data === "SUCCESS") {
        fetchData();
      } else {
        throw new Error("Error updating plant");
      }
    } catch (error) {
      console.error("Error updating plant:", error);
      alert("Error al actualizar planta");
    }
  };

  const deletePlant = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/plantas/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("Error al eliminar planta");
    }
  };

  const createPlant = async () => {
    try {
      const username = document.getElementById("username").value;
      const especie = document.getElementById("especie").value;
      const edad_inicial = document.getElementById("edad_inicial").value;
      const data = { username, especie, edad_inicial };

      await axios.post("http://127.0.0.1:5000/plantas", data);
      fetchData();
    } catch (error) {
      console.error("Error creating plant:", error);
      alert("Error al crear planta");
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <form className="card card-body">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />
            <label htmlFor="especie">Especie:</label>
            <input type="text" id="especie" />
            <label htmlFor="edad_inicial">Edad Inicial:</label>
            <input type="text" id="edad_inicial" />
            <div>
              <button className="btn btn-success" onClick={createPlant}>
                Añadir Planta
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-4">
        <div>
          <table id="tabla-jardin" className="table table-stripped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Edad</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((plant) => (
                <tr key={plant.plant_id}>
                  <td>{plant.username}</td>
                  <td>{plant.especie}</td>
                  <td>{plant.edad}</td>
                  <td>{plant.cantidad}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => editPlant(plant.plant_id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={() => deletePlant(plant.plant_id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Plantas;