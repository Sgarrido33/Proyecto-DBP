import React from 'react';
import BotonLike from './BotonLike'
import '../stylesheets/Publicacion.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function Publicacion (props) {
    const { datos }=props;
    const navigate = useNavigate()
    const { user } = useUser()

    const darLike = async (pub_id) => {
        try {
          var data={  pub_id, username: user.username }
          await axios.post('http://127.0.0.1:5000/megustas', data);
        } catch (error) {
            alert("error")
            console.error(error);
        }
    }

    return(
    <div className="contenedor">
        
            {datos.map((publicacion) => (
                <div   key={publicacion.pub_id} className='contenedor-publicacion'>
                    <div style={{ flex: 1, display: 'flex' }}>
                        <div className='publicacion-main'>
                            <p className='publicacion-username'>{publicacion.username}</p>
                            <p>{publicacion.descripcion}</p>
                            <div className='publicacion-image'></div>
                        </div>
                        <div className='publicacion-comentarios'>
                            <div style={{ }}>
                                <label>Likes 5</label>
                                <button onClick={() => darLike(publicacion.pub_id)}>Dar Like</button>
                            </div> 
                            <button onClick={() => {
                                navigate(`/detalle-publicacion/${publicacion.pub_id}`)
                            }}>Ver comentarios</button>
                        </div>
                    </div>
                </div>
            ))}
        {/*<div className="contenedor-comentarios">
            {datos.map((publicacion) => (
            <p key={publicacion.pub_id}>
                Comentarios: 
                {publicacion.comments}
                <Comentarios/>
            </p>
            ))}
            </div>*/}
    </div>
    
    )
}


export default Publicacion;