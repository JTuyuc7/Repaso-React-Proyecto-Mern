const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    // Leer el token del header
    const token = req.header('x-auth-token');
    //console.log(token);

    // Revisar si no hay token valido
    if( !token ){
        return res.status(401).json({ msg: "Token no valido, permiso denegado"});  // Si no existe token, mostrar un mensaje de error
    }

    // Validar el token
    try {
        
        const cifrado = jwt.verify( token, process.env.SECRETA );     // crear una variable que almacene si el token enviado es igualal ql que esta guardado en las vaiables
        req.usuario = cifrado.usuario;           // si se verifica el token, se agrega a los datos que se necesitan pára el usuario
        next();       // Pasar a la siguiente funcion para los proyectos

    } catch (error) {
        res.status(401).json({ msg: "Token no valido"});
    }
}