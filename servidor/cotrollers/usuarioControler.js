//Importar el modelo de los usuarios
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Importar bcrypt para hasear las contraseñas
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async ( req, res ) => {

    // Revisar si hay errores al llenar los campos
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // Retorna un arreglo de los errores en la pantalla
    }

    //Extraer email y pasword para realizar la validacion
    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({ msg: "Usuario ya existente "});
        }

        // Crear el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password despues instanciar la creacion de un nuevo usuario
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guardar el usuario
        await usuario.save();

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
        res.status(400).send("Usuario no Guardado");
    }
}