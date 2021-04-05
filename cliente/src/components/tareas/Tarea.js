import React, { useContext } from 'react';

//Context de proyecto
import ProyectoContext from '../../context/proyectos/proyectoContext';

//Context de Tarea
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //Context de proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    //contex de tareas
    const tareaContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, obtenerTareaActual, actualizarTarea } = tareaContext;

    const [ proyectoActual ] = proyecto;

    //Funcion para eliminar tareas
    const onClikcEliminar = (id) => {
        eliminarTarea(id, proyectoActual._id );

        obtenerTareas(proyectoActual.id);
    }

    //Funcion para cambiar el estado de una tarea
    const onClickEstado = (tarea) => {
        if( tarea.estado ){
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }

        actualizarTarea(tarea);

    }

    // Funcion para poder editar una tarea
    const onClikcEditar = (tarea) => {
        obtenerTareaActual(tarea);
    }

    return (  
        <>
            <div>
                <li className="tarea sombra">
                    <p>{tarea.nombre}</p>

                    <div className="estado">
                        {tarea.estado ? 
                            (
                                <button
                                    type="button"
                                    className="completo"
                                    onClick={() => onClickEstado(tarea) }
                                >Completo</button>
                            ) :

                            (
                                <button
                                    type="button"
                                    className="incompleto"
                                    onClick={() => onClickEstado(tarea) }
                                >Incompleto</button>
                            )
                        }
                    </div>
                    <div className="acciones">
                        <button
                            type="button"
                            className="btn btn-primario"
                            onClick={ () => onClikcEditar(tarea) }
                        >Editar</button>

                        <button
                            type="button"
                            className="btn btn-secundario"
                            onClick={ () => onClikcEliminar(tarea._id) }
                        >Eliminar</button>
                    </div>
                </li>
            </div>
        </>
    );
}

export default Tarea;