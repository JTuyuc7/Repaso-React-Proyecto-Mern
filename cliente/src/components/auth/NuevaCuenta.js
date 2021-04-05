import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importar el context de las alertas
import AlertaContext from '../../context/alertas/alertaContext';

// Importar el context para la autenticacion
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //Extraer las funciones del context
    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, registrarUsuario } = authContext;

    // En caso que haya registrado, autenticado o se tenga un error al crear el usuario
    useEffect(() => {

        if( autenticado ){
            props.history.push('/proyectos')
        };

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        };
    // eslint-disable-next-line
    },[autenticado, mensaje, props.history]);

    //State para la creacion de la cuenta
    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''

    });

    const { nombre, email, password, confirmar } = usuario;

    const actualizarState = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const enviarDatos = (e) => {
        e.preventDefault();

        //Validar que los campos no esten vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Contraseña que sea minima de 6 caracteres
        if( password.length < 6 ){
            mostrarAlerta('El password debe ser minimo 6 caracteres', 'alerta-error');
            return;
        }

        //Verificar que los passwords coincidan
        if( password !== confirmar ){
            mostrarAlerta('La contraseña debe de coincidir', 'alerta-error');
            return;
        }

        //Loguear al ususario
        // Una vez pasada la validacion y confirmar los datos enviar la peticion al servidor
        registrarUsuario({
            nombre,
            email,
            password
        });                               // Enviar todos los datos

        //Habilitar para que puedan hacerse peticiones con CORS
    };

    return (  
        <>
            <div className="form-usuario">
                { alerta ? <div className={ `alerta ${alerta.categoria}`} >{alerta.msg}</div>  : null }
                <div className="contenedor-form sombra-dark">
                    <h1>Crear Cuenta</h1>
                    <form
                        onSubmit={enviarDatos}
                    >
                        <div className="campo-form">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                name="nombre"
                                id="nombre"
                                onChange={actualizarState}
                                value={nombre}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Tu email"
                                name="email"
                                id="email"
                                onChange={actualizarState}
                                value={email}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Tu password"
                                name="password"
                                id="password"
                                onChange={actualizarState}
                                value={password}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="confirmar">Confirmar Password</label>
                            <input
                                type="password"
                                placeholder="Confirma tu password"
                                name="confirmar"
                                id="confirmar"
                                onChange={actualizarState}
                                value={confirmar}
                            />
                        </div>
                        <div className="campo-form">
                            <input
                                type="submit"
                                value="Crear Cuenta"
                                className="btn btn-block btn-primario"
                            />
                        </div>
                    </form>

                    <Link to={'/'} className="enlace-cuenta">Iniciar Sesión</Link>
                </div>
            </div>
        </>
    );
}

export default NuevaCuenta;