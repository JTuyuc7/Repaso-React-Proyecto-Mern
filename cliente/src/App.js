import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Login from './components/auth/Login';
import Proyectos from './components/proyectos/Proyectos';

//Importar el componente para la proteccion de los datos
import RutaPrivada from './components/rutas/RutaPrivada';

//context de proyecto
import ProyectoState from './context/proyectos/proyectoState';

//Context de tareas
import TareaState from './context/tareas/tareaState';

//Context de las alertas
import AlertaState from './context/alertas/alertaState'

// Context de la autenticacion
import AuthSatate from './context/autenticacion/authState';

// Importar el archivo donde esta el token
import tokenAuth from './config/token';

// Revisar si existe un token para loguear al usuario
const token = localStorage.getItem('token');

// Si existe el token cargar los componentes
if( token ){
  tokenAuth( token );
}

function App() {

  return (
    <>
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthSatate>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
              </Router>
            </AuthSatate>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </>
  );
}

export default App;
