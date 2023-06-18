import React from "react";
import '../stylesheets/Logro.css';

function Logro(props){
    const {datos} = props;
    return(
        <div className="contenedor-logro">
            <div className="contenedor-autor">
                <h5>{datos.autor}</h5>
            </div>
            <div className="contenedor-imagen">
                <img src={require(`../imagenes/${datos.imagen}.jpg`)} alt="foto-planta"></img>
            </div>
            <div className="contenedor-star">
                
            </div>
        </div>
    )
}

export default Logro;