import React, { useReducer } from 'react';

// Importar el Context y el Proyider
import AlertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';


const AlertaState = (props) => {

    const initialState = {
        alerta: null
    }

    // Definir el state
    const [ state, dispatch ] = useReducer( alertaReducer, initialState );

    // Funcion para mostrar la alerta
    const mostrarAlerta = ( msg, categoria ) => {        // La funcion puede tomar 2 parametros 
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        // Despues de 5 segundos ocultar la alerta mandando llamar un segundo dispach.
        setTimeout(() => {                               // Dentro de la funcion puede ir un setTimeout para mandar a llamar un segundo dispatch
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }

    return(
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,

                //Funciones para mostrar las alertas
                mostrarAlerta,

            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )

}

export default AlertaState;