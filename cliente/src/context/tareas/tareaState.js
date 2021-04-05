import React, { useReducer } from 'react';

import { 
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    MOSTRAR_ERROR,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
} from '../../types';

// Importar el context y el Provider
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

// Importar el cliente axios
import clienteAxios from '../../config/axios';

const TareaState = (props) =>{

    const initialState = {
        tareasproyecto: [],
        errorform: false,
        tareaseleccionada: null,
    }

    // Dispatch y state
    const [ state, dispatch ] = useReducer( tareaReducer, initialState );

    //Funciones para el cambio de las tareas

    // Funcion para obtener las tareas
    const obtenerTareas = async (proyecto) => {

        try {
            
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            dispatch({
                type: OBTENER_TAREAS,
                payload: resultado.data.listaproyectos
            })

        } catch (error) {
            console.log(error);
        }
    };

    // Funcion para agregar tarea sl proyecto seleccionado
    const agregarTarea = async (tarea) => {
        try {
            
            const respuesta = await clienteAxios.post('/api/tareas', tarea );
            
            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    //Funcion para mostra un error en la tarea del formulario
    const mostrarError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        })
    }

    //Funcion para Eliminar Una tarea por ID de proyecto y ID de tarea
    const eliminarTarea = async (id, proyecto ) => {
        
        try {
            
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Funcion para actualizar una tarea
    const actualizarTarea = async (tarea) =>{
        try {
            
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea );
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.tarea
            })

        } catch (error) {
            console.log(error);
        }
    }


    //Funcion para obtener la tarea actual
    const obtenerTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Funcio para limpiar la tarea una vez editada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errorform: state.errorform,
                tareaseleccionada: state.tareaseleccionada,

                obtenerTareas,
                agregarTarea,
                mostrarError,
                eliminarTarea,
                obtenerTareaActual,
                actualizarTarea,
                limpiarTarea,
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;

/*

            { id: 1, nombre: 'tarea 1', estado: false, proyectoId: 1 },
            { id: 2, nombre: 'tarea 2', estado: true, proyectoId: 1 },
            { id: 3, nombre: 'tarea 3', estado: true, proyectoId: 2 },
            { id: 4, nombre: 'tarea 4', estado: false, proyectoId: 2 },
            { id: 5, nombre: 'tarea 5', estado: false, proyectoId: 3},
            { id: 6, nombre: 'tarea 6', estado: false, proyectoId: 1 },
            { id: 7, nombre: 'tarea 7', estado: true, proyectoId: 1 },
            { id: 8, nombre: 'tarea 8', estado: true, proyectoId: 2 },
            { id: 9, nombre: 'tarea 9', estado: false, proyectoId: 4 },
            { id: 10, nombre: 'tarea 10', estado: true, proyectoId: 5 },
            { id: 11, nombre: 'tarea 11', estado: true, proyectoId: 5 },
        
*/

//3213542721