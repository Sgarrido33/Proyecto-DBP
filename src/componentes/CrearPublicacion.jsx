import React, { useEffect, useState } from 'react';
import axios from "axios";
import Publicacion from './Publicacion'
import withAuth from '../hocs/withAuth';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

function CrearPublicacion(){
    const [datos, setDatos] = useState([]);
    const { user } = useUser()
    const navigate = useNavigate()


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
            //fetchData();
            navigate('/main')
        } else {
            alert("Error al crear la publicación");
        }
        } catch (error) {
        console.error(error);
        }
    };
  
  
  return (
    <div style={{ flex: 1}}>
        <div className="form">
          <label htmlFor="descripcion">Descripcion:</label>
          <input type="text" id="descripcion" />
          <label htmlFor="tipo">Tipo:</label>
          <select name="tipo" id="tipo">
            <option>Seleccione</option>
            <option>Dar consejo</option>
            <option>Pedir ayuda</option>
          </select>
          <label htmlFor="asunto">Asunto:</label>
          <input type="text" id="asunto" />
          <label htmlFor='media'>Media:</label>
          <input type='file' id="archivo"></input>
          <button type="button" onClick={createPublicacion}>
          Crear Publicacion </button>
        </div>     
    </div>
  );
}
export default withAuth(CrearPublicacion);

