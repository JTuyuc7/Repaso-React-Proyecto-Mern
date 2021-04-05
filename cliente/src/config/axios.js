import axios from 'axios';

// Crear un archivo que almacene la URL para las peticiones del backend
const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL  // Donde se almacena la url para produccion
});

export default clienteAxios;    // Exportamos el archivo para hacerlo disponible en los demas componentes