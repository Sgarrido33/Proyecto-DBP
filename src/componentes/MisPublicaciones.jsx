import React from 'react';
import withAuth from '../hocs/withAuth';

import ListaPublicaciones from './ListaPublicaciones';

function MisPublicaciones(){

  return <ListaPublicaciones  title="Mis Publicaciones" misPublicaciones/>
}

export default withAuth(MisPublicaciones);

