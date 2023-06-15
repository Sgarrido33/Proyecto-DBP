import React from "react";
import Logro from './Logro';
function Logros(){
    return(
        <div className="contenedor-logros">
            <div>
                <h5>Logros recientes</h5>
            </div>
            <div className="contenedor-contenido">
                <Logro
                    autor='user1234'
                    imagen='planta1'
                />
            </div>
        </div>
    )
}