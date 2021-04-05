import React, { useContext, useState } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, validarFormulario } = proyectosContext;

    //State para leer los datos del nuevo proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const actualizarState = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmtiProyecto = (e) => {
        e.preventDefault();
        //Validar que no este vacio
        if(nombre.trim() === ''){
            validarFormulario();
            return;
        };
        
        agregarProyecto(proyecto);

        //Reiniciar el state
        guardarProyecto({
            nombre: ''
        })
    }

    // Funcion que muestre o esconda el formulario para agregar una nueva tarea
    const botonFormulario = () => {
        mostrarFormulario()
    }

    return (  
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={botonFormulario}
            >Nuevo Proyecto</button>

            { formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmtiProyecto}
                    >
                        <div className="campo-form">
                            <input
                                className="input-text"
                                type="text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                onChange={actualizarState}
                                value={nombre}
                            />
                        </div>
                        <div className="campo-form">
                            <input
                                type="submit"
                                value="Agregar Proyecto"
                                className="btn btn-block btn-primario"
                            />
                        </div>
                        { errorformulario ? <p className="mensaje error">Nombre obligatorio</p> : null }
                    </form>
                ) :

                null
            }
        </>
    );
}

export default NuevoProyecto;