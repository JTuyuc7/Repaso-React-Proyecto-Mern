import React, { useReducer } from 'react';

import ProyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

//TYPES 
import { FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR,
} from '../../types';

// Importar el cliente axios para tener acceso a la URL de la base de datos.
import clienteAxios from '../../config/axios';

const ProyectoState = (props) => {

    const initialState = {

        //Listado de los proyectos
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer( proyectoReducer, initialState );

    // Funciones para el CRUD

    //Funcion para cambiar el formumario a true
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Funcion para obtener proyectos
    const obtenerProyectos = async () => {
        
        try {
            const proyectos = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: proyectos.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error al Obtener los proyectos',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar un nuevo proyecto
    const agregarProyecto = async (proyecto) => {
        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto)
            //Agregar el proyecto
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error al agregar la tarea',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Validar Formulario
    const validarFormulario = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Obtener el proyecto activo
    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Funcion para eliminar el proyecto
    const eliminarProyecto = async (proyectoId) => {
        
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error al eliminar la tarea',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                //State
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                eliminarproyecto: state.eliminarproyecto,
                mensaje: state.mensaje,

                //Funciones
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                validarFormulario,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;