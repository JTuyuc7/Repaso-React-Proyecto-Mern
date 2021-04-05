import React, { useContext, useEffect } from 'react';

// Importar el Context de la autenticacion para mostrar el nombre del usuario
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();

        // eslint-disable-next-line
    }, []);

    return (  
        <>
            <header className="app-header">
                { usuario ? ( <p className="nombre-usuario">Hola <span>{usuario.usuario.nombre}</span></p>) : null }
                <nav className="nav-principal">
                    <button
                        className="btn btn-blank cerrar-sesion btnBoton"
                        type="button"
                        onClick={ () => cerrarSesion() }
                    >Cerrar Sesión</button>
                </nav>
            </header>
        </>
    );
}

export default Barra;