import React, { useState,useEffect} from "react";
import axios from "axios";
import { useUser } from "../hooks/useUser";

function Comentarios({ pub_id }) {
  const [data, setData] = useState([]);
  const { user } = useUser()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/comentarios");
      console.log("response", response?.data)
      const data = (response?.data ?? []).filter(comment => comment.pub_id == pub_id)
      console.log("data", data)
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editComment = async (id) => {
    try {
      // Aquí puedes realizar la solicitud PUT a la API para editar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Recuerda enviar los datos en el cuerpo de la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la edición
      var contenido = document.getElementById("contenido").value;
    var data={ contenido }
    await axios.put(`http://127.0.0.1:5000/comentarios/${id}`, {
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

  const deleteComments = async (id) => {
    try {
      // Aquí puedes realizar la solicitud DELETE a la API para eliminar la planta con el ID proporcionado
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la eliminación
      axios
      .delete(`http://127.0.0.1:5000/publicacion/${id}`);
      fetchData();
      
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async () => {
    try {
      // Aquí puedes realizar la solicitud POST a la API para crear una nueva planta
      // Puedes utilizar axios o fetch para realizar la solicitud
      // Recuerda enviar los datos en el cuerpo de la solicitud
      // Luego, puedes llamar a fetchData() para actualizar los datos después de la creación
      var contenido = document.getElementById("contenido").value;
    var data={ contenido, pub_id, username: user.username }


    
    await axios.post('http://127.0.0.1:5000/comentarios', data);

    fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div className="Comentarios">
        <div className="form">
        <label htmlFor="contenido">Comentarios:</label>
        <input type="text" id="contenido" />
        <button type="button" onClick={createComment}>
        Añadir Comentarios </button>
        
        
        </div>
      <table id="tabla-comentarios">
        <thead>
          <tr>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {data.map((comentario) => (
            <tr key={comentario.comment_id}>
              <td>{comentario.username ?? 'Anonimo'}</td>
              <td>{comentario.contenido}</td>
              <td>
                <button type="button" onClick={() => editComment(comentario.commnent_id)}>
                  Editar
                </button>
                <button type="button" onClick={() => deleteComments(comentario.commnent_id)}>
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



export default Comentarios;

