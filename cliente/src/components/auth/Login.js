import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Importar el context de autenticacion
import AuthContext from '../../context/autenticacion/authContext';

// Importar el context de alerta
import AlertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria );
        }
    // eslint-disable-next-line
    }, [mensaje, autenticado, props.history ]);

    //State para almacenar los datos
    const [ datos, guardarDatos ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = datos;

    const actualizarState = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //Validacion de los datos
        if( email.trim() === '' || password.trim() === ''){

            mostrarAlerta('Los campos son obligatorios', 'alerta-error');
            return;
        }

        iniciarSesion({
            email,
            password
        })
    }

    return (  
        <>
            <div className="form-usuario">
                {alerta ? (<div className={ `alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
                <div className="contenedor-form sombra-dark">
                    <h1>Inicia Sesión</h1>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Tu email"
                                id="email"
                                name="email"
                                onChange={actualizarState}
                                value={email}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Tu password"
                                id="password"
                                name="password"
                                onChange={actualizarState}
                                value={password}
                            />
                        </div>
                        <div className="campo-form">
                            <input
                                className="btn btn-block btn-primario"
                                type="submit"
                                value="Iniciar Sesión"
                            />
                        </div>
                    </form>

                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener Cuenta</Link>
                </div>
            </div>
        </>
    );
}

export default Login;