// Archivo de rutas para crear el usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../cotrollers/usuarioControler');
const { check } = require('express-validator');

//Crear un usuario
// enpoint es /api/usuarios 
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),  //Revisar que el nombre no este vacio
        check('email', 'Agrega un email valido').isEmail(),   // Revisar que sea un email valido
        check('password', 'Agrega minimo 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router