import React from 'react';
import withAuth from '../hocs/withAuth';
import '../stylesheets/main.css'
import ListaPublicaciones from './ListaPublicaciones';

function Main() {
    return(
        <ListaPublicaciones title="Publicaciones" />
    )
}


export default withAuth(Main)