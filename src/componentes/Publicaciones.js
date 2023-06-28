import React, { useEffect, useState } from 'react';
import axios from "axios";
import Publicacion from './Publicacion'

function Publicaciones(){
    const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una solicitud a la base de datos para obtener los datos
    // y luego establecerlos en el estado "datos" usando setDatos
    // Supongamos que los datos se obtienen correctamente y son un arreglo de objetos
    
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/publicaciones");
      setDatos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const editPublicacion = async (id) => {
    try {
      // Aquí puedes realizar la solicitud PUT a la API para editar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Recuerda enviar los datos en el cuerpo de la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la edición
      const descripcion = document.getElementById("descript").value;
    const tipo = document.getElementById("tipo").value;
    const asunto = document.getElementById("asunto").value;
    const user=document.getElementById("username").value;
    const data={"descripcion": descripcion, "tipo":tipo, "asunto":asunto,"usuario":user}
    
    axios
    .put(`http://127.0.0.1:5000/publicacion/${id}`,{
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
      })
        .then(
          response =>response.text())
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

  const deletePublicacion = async (id) => {
    try {
      // Aquí puedes realizar la solicitud DELETE a la API para eliminar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la eliminación
      axios
      .delete(`http://127.0.0.1:5000/publicacion/${id}`)
      .then(response =>response.text())
      .then(text => {
          if(text==="SUCCESS"){
              fetchData();
          }
          else{
              alert("Error")
          }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createPublicacion = async () => {
    try {
      const descripcion = document.getElementById("descript").value;
      const tipo = document.getElementById("tipo").value;
      const asunto = document.getElementById("asunto").value;
      const user = document.getElementById("username").value;
      const archivo = document.getElementById("archivo").files[0];
  
      const formData = new FormData();
      formData.append("descripcion", descripcion);
      formData.append("tipo", tipo);
      formData.append("asunto", asunto);
      formData.append("usuario", user);
      formData.append("archivo", archivo);
  
      const response = await axios.post("/publicaciones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data === "SUCCESS") {
        fetchData();
      } else {
        alert("Error al crear la publicación");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div>
        <div className="form">
          <label htmlFor="descript">Descripcion:</label>
          <input type="text" id="descript" />
          <label htmlFor="tipo">Tipo:</label>
          <select name="transporte">
            <option>Seleccione</option>
            <option>Dar consejo</option>
            <option>Pedir ayuda</option>
          </select>
          <label htmlFor="asunto">Asunto:</label>
          <input type="text" id="asunto" />
          <label htmlFor='media'>Media:</label>
          <input type='file' id="media"></input>
          <button type="button" onClick={createPublicacion}>
          Crear Publicacion </button>
        </div>
      <h4>Publicaciones</h4>
      <Publicacion datos={datos} />
      {datos.map((publicacion) => (
            <tr key={publicacion.id}>
              <td>{publicacion.descripcion}</td>
              <td>{publicacion.tipo}</td>
              <td>{publicacion.asunto}</td>
              <td>
                <button type="button" onClick={() => editPublicacion(publicacion.id)}>
                  Editar
                </button>
                <button type="button" onClick={() => deletePublicacion(publicacion.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
    </div>
  );
}
export default Publicaciones;

