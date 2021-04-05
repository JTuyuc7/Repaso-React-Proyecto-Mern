import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Poyecto from './Proyecto';

//Context
import ProyectContext from '../../context/proyectos/proyectoContext';

// Context de las Alertas
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    const proyectoContext = useContext(ProyectContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectoContext;

    // Extraer los datos 
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {
        obtenerProyectos();

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        // eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length === 0) return <p>Comienza creando un proyecto</p>;

    return (  
        <>
            <ul className="listado-proyectos">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
                <TransitionGroup>
                    { proyectos.map( proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={500}
                            classNames="proyecto"
                        >
                            {
                                <Poyecto
                                    proyecto={proyecto}
                                />
                            }
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>
        </>
    );
}

export default ListadoProyectos;

//Agregar la animacion a el listado de proyectos
