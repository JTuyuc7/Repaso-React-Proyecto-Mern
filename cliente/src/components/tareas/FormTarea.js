import React, { useState, useContext, useEffect } from 'react';

//context de proyectos
import ProyectoContext from '../../context/proyectos/proyectoContext';

// context de las tareas
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Revisar que el formulario para tareas se muestre solo si hay seleccionado alguna proyecto
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    //Extraer el context de las tareas
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errorform, mostrarError, agregarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //State para almacenar las tareas
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    });

    // extraer el valor del state
    const { nombre } = tarea;

    //Effect para cuando se seleccione editar
    useEffect(() => {
        if(tareaseleccionada !== null ) {
            guardarTarea(tareaseleccionada);
        }else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    if(!proyecto) return null;
    const [ proyectoActual ] = proyecto;

    const actualizarState = (e) =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    };

    const onSubmitTarea = (e) => {
        e.preventDefault();

        //validar el formulario
        if( nombre.trim() === '' ) {
            mostrarError();
            return;
        }

        //Revisar si el cambio es una nueva tarea o una edicion
        if(tareaseleccionada === null ){
            // agregar nueva tarea
            
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else {
            //actualizar tarea
            actualizarTarea(tarea);

            //Limpriar los datos del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas de un proyecto por id
        obtenerTareas(proyectoActual._id);

        //Reiniciar el formulario
        guardarTarea({
            nombre: ''
        })
    }

    return (  
        <>
                { proyecto ? (
                    <div className="formulario">
                        <form
                            onSubmit={onSubmitTarea}
                        >
                            <div className="contenedor-input">
                                <input
                                    type="text"
                                    placeholder="Nombre Tarea"
                                    className="input-text"
                                    name="nombre"
                                    onChange={actualizarState}
                                    value={nombre}
                                />
                            </div>
                            <div className="contenedor-input">
                                <input
                                    type="submit"
                                    value={ tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                                    className="btn btn-block btn-primario btn-submit"
                                />
                            </div>
                        </form>

                        { errorform ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
                    </div>
                ) : null }
        </>
    );
}

export default FormTarea;