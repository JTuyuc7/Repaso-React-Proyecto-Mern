
// Importar los types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,

} from '../../types';

export default ( state, action ) => {
    switch( action.type ){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token );
            return{
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem('token');           //Se existe un error remover el token de localstorage para no guardar informacion del usuario
            return{
                ...state,
                token: null,
                mensaje: action.payload
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                autenticado: null,
                usuario: null,
                token: null,
                cargando: false
            }
        default:
            return state;
    }
}