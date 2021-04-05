import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Importar el context de autorizacion
import AuthContext from '../../context/autenticacion/authContext';

// Crear el componente par saber si esta autorizado para ver las paginas
const RutaPrivada = ({ component: Component, ...props }) => {

    //Extraer la funcion y verificar que el usuario este autenticado
    const authContext = useContext(AuthContext);
    const { cargando, autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    // eslint-disable-next-line
    }, []);

    return (  
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />         //Si el usuariono no esta autenticado redirigirlo a la pagina principal
        ) : (
            <Component {...props} />    // Caso contrario enviarlo y permitirle el acceso a todas las paginas
        ) }
        />
    );
}

export default RutaPrivada;