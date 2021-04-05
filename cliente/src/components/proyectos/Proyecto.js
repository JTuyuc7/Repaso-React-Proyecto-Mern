import React, { useContext } from 'react';

//Context
import ProyectoContext from '../../context/proyectos/proyectoContext';

//Context tarea
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //State para proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;

    //State para las tareas
    const tareaContext = useContext(TareaContext);
    const { obtenerTareas } = tareaContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoActual(id); //Fijar un proyect actual
        obtenerTareas(id); // Obtener las tareas cuando se den click
    }

    return (  
        <>
            <li className="listado-proyectos">
                <button
                    type="button"
                    className="btn btn-blank"
                    onClick={ () => seleccionarProyecto(proyecto._id) }
                >{proyecto.nombre}</button>
            </li>
        </>
    );
}

export default Proyecto;