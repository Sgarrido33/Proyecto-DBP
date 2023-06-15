import React from 'react';
import Publicacion from './Publicacion';

function Publicaciones(){
    return(
        <div>
            <Publicacion
            imagen={'planta1'}
            username={'Planta'}
            descrip={'blablabla'}
            comments={'Ok'}
        />
        <Publicacion
            imagen={'planta1'}
            username={'Planta'}
            descrip={'blablabla'}
            comments={'Esta bien'}
        />
        <Publicacion
            imagen={'planta1'}
            username={'Planta'}
            descrip={'blablabla'}
            comments={''}
        />
        </div>
        
    )
    
}

export default Publicaciones();