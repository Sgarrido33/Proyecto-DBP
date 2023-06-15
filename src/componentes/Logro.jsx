import React from "react";

function Logro(props){
    return(
        <div className="contenedor-logro">
            <div className="contenedor-autor">
                <h5>{props.autor}</h5>
            </div>
            <div className="contenedor-imagen">
                <img src={require(`../imagenes/${props.imagen}.jpg`)} alt="foto-planta"></img>
            </div>
            <div className="contenedor-star">
                
            </div>
        </div>
    )
}

export default Logro;