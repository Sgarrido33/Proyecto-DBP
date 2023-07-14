import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import Comentarios from './Comentarios'

function DetallePublicacion() {
  const params = useParams()  

  useEffect(() => {
    console.log({params})
  },[])
    
  return (
    <div  className='contenedor-publicacion'>
        <div style={{ flex: 1, display: 'flex' }}>
            <div className='publicacion-main'>
                <p className='publicacion-username'>{'publicacion.username'}</p>
                <p>{'publicacion.descripcion'}</p>
                <img className='publicacion-image'  src={require(`../imagenes/planta1.jpg`)}></img>
            </div>
           <Comentarios pub_id={params.pub_id} />
        </div>
    </div>
  )
}

export default withAuth(DetallePublicacion)