import React, { useContext } from 'react';
import Tarea from '../tareas/Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Context de proyectos
import ProyectoContext from '../../context/proyectos/proyectoContext';

// Context de tareas
import TareaContext from '../../context/tareas/tareaContext';

const ListadoTarea = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectoContext;

    //Extraer el context de las tareas
    const tareaContext = useContext(TareaContext);
    const { tareasproyecto } = tareaContext;

    // Si no hay proyectos retornar un mensaje
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    //Destructurig para los proyectos actuales
    const [ proyectoActual ] = proyecto;

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (  

        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                { tareasproyecto.length === 0 ?
                    (<li className="tarea"><p>No hay tareas</p></li>) :
                    <TransitionGroup>
                        {
                            (
                                tareasproyecto.map( tarea => (
                                    <CSSTransition
                                        key={tarea._id}
                                        timeout={400}
                                        classNames="tarea"
                                    >
                                        <Tarea
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                ) )
                            )
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-primario"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </>
    );
}

export default ListadoTarea;