import React, { useReducer } from 'react';

// Importar types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION

} from '../../types';

//Importar el context y el reducer
import AuthContext from './authContext';
import AuthReducer from './authReducer';

// Importar el cliente axios para poder acceder a las propiedades de la API
import clienteAxios from '../../config/axios';

// Importar el token para agregarlo
import tokenAuth from '../../config/token';

const AuthSatate = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    // Definir el state
    const [ state, dispatch ] = useReducer( AuthReducer, initialState );

    //Funciones que modificaran el state
    // Funcion que registra a los usuarios
    const registrarUsuario = async (datos) => {
        try {                                       // Dentro de la funcion como se enviara una peticion al servidor hay que ponerlo dentro de un trycatch
            
            const respuesta = await clienteAxios.post('/api/usuarios', datos );
            //console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data               // Pasar el token al payload para la creacion del usuaro
            });

            //Obtener la informacion del usuario
            usuarioAutenticado();
        } catch (error) {
            //console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Funcion para obtener la informacion del usuario
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');                       // Obtener el token con la informacion del usuario

        if( token ){
            // TODO: Funcion para pasar el token por headers
            tokenAuth(token);
        }

        try {
            
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta.data.usuario.nombre);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Funcion para iniciar sesion ya teniendo una cuenta
    const iniciarSesion = async (datos) => {

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos );
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            //Obtener la informacion del usuario
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //funcion para cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,

                //Funciones
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthSatate;