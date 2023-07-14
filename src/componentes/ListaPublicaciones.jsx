import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import Publicacion from './Publicacion'
import withAuth from '../hocs/withAuth';
import { useUser } from '../hooks/useUser';

function ListaPublicaciones({title, misPublicaciones = false}){
    const [datos, setDatos] = useState([]);
    const { user } = useUser()

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

  const filtrarData = () => {
    if(misPublicaciones) {
        const filteredData = datos.filter(p => p.username === user.username)
        return filteredData
    }

    return datos
  }

  const dataFiltrada = filtrarData()


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
      const descripcion = document.getElementById("descripcion").value;
      const tipo = document.getElementById("tipo").value;
      const asunto = document.getElementById("asunto").value;
      const archivo = document.getElementById("archivo").files[0];

  
      const formData = new FormData();
      formData.append("descripcion", descripcion);
      formData.append("tipo", tipo);
      formData.append("asunto", asunto);
      formData.append("username", user.username);
      formData.append("archivo", archivo);

      const response = await axios.post("http://127.0.0.1:5000/publicaciones", formData);
  
      if (response.status === 200) {
        fetchData();
      } else {
        alert("Error al crear la publicación");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div style={{ flex: 1}}>
      <h4>{title}</h4>
      <Publicacion datos={dataFiltrada} />
    </div>
  );
}
export default ListaPublicaciones;

