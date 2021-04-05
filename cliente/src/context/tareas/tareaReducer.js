import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    MOSTRAR_ERROR,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

export default ( state, action ) => {
    switch(action.type){
        case OBTENER_TAREAS:
            return{
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasproyecto: [ action.payload, ...state.tareasproyecto],
                errorform: false
            }
        case MOSTRAR_ERROR:
            return{
                ...state,
                errorform: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload )
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map( tarea => tarea._id === action.payload._id ? action.payload : tarea )
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaseleccionada: null
            }
        default:
            return state;
    }
}


// Continuar cuando se logre conectar a la base de datos //

