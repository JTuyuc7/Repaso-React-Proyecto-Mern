const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    
    // Revisar si existe algun error
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores : errores.array() }) // Retornar un arreglo de errores
    }

    // Extraer el password y el correco
    const { email, password } = req.body;

    // Verificar que el usuario exista y luego crear el token
    try {
        
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({ msg: "El Usuario no existe "})
        }

        // Revisar que la contraseña sea la misma para brindarle el accesso
        const paswordCorrecto = await bcryptjs.compareSync( password, usuario.password );

        // Mandar un error a la consola si no es correcta
        if(!paswordCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto'});
        }

        //Crear el objeto del Json web token
        const payload = {   // Objeto que retorna la respuesta del jsonwebtoken
            usuario: {
                id: usuario.id
            }
        }

        //Firmar el json web token
        jwt.sign( payload, process.env.SECRETA, {        // se usa la fucion para crear el token, y la palabra secreta 
            expiresIn: 10800 //autenticado por 3 horas   // Se define la cantidad de tiempo que el token estara vigente 
        }, ( error, token ) => {                         // arrow function para almacenar un error o el token
            if( error ) throw error;                     // Retornar un error si el token no se pudo crear correctamente

            res.json({ token: token })                   // enviamos un objeto con el token creado y firmado
        } );

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Usuario No encontrado"});
    }
    
}


// Metodo para obtener la informacion del usuario autenticado
exports.verificarUsuario = async ( req, res ) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');   // Almacenamos la informacion del usuario
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al obterner la informacion"});
    }
}