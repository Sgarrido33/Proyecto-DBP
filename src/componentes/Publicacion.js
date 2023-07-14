import React from 'react';
import BotonLike from './BotonLike'
import '../stylesheets/Publicacion.css'
import Comentarios from './Comentarios';
import { useNavigate } from 'react-router-dom';

function Publicacion (props) {
    const { datos }=props;
    const counter = <BotonLike/>;
    const navigate = useNavigate()

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
                                <button>Dar Like</button>
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