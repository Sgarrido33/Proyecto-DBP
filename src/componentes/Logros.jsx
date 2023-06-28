import React, {useState,useEffect} from "react";
import Logro from './Logro';

function Logros(){
    const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una solicitud a la base de datos para obtener los datos
    // y luego establecerlos en el estado "datos" usando setDatos
    // Supongamos que los datos se obtienen correctamente y son un arreglo de objetos

    const datosObtenidos = obtenerDatosDeLaBaseDeDatos();
    setDatos(datosObtenidos);
  }, []);

    return (
    <div className="contenedor-logros">
        <div className="contenedor-logros-titulo">
            <h5>Logros recientes</h5>
        </div>
        <div className="contenedor-contenido">
            <Logro datos={datos} />    
        </div>
    </div>
    );
}

export default Logros;