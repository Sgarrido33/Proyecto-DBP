import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import withAuth from "../hocs/withAuth";
import Comentarios from "./Comentarios";

function DetallePublicacion() {
  const params = useParams();
  const location = useLocation();
  const [publicacion, setPublicacion] = useState(location.state);

  useEffect(() => {
    const persistedPublicacion = localStorage.getItem("publicacion");
    if (persistedPublicacion) {
      setPublicacion(JSON.parse(persistedPublicacion));
    } else {
      setPublicacion(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("publicacion", JSON.stringify(publicacion));
  }, [publicacion]);
  useEffect(() => {
    console.log({ params });
  }, []);

  return (
    <div className="contenedor-publicacion">
      <div style={{ flex: 1, display: "flex" }}>
        <div className="publicacion-main">
          <p className="publicacion-username">{publicacion.username}</p>
          <p>{publicacion.descripcion}</p>

          <img
            className="publicacion-image"
            src={"http://127.0.0.1:5000/" + publicacion?.imagen}
          ></img>
        </div>
        <Comentarios pub_id={params.pub_id} />
      </div>
    </div>
  );
}

export default withAuth(DetallePublicacion);
