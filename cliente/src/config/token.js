//Almacena el token una vez registrado el usuario
import clienteAxios from './axios';

const tokenAuth = (token) => {

    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}
export default tokenAuth;