
// Ruta para autenticar los usuarios
const express = require('express');
const router = express.Router();
const authController = require('../cotrollers/authController');
const { check } = require('express-validator');

//Importat el middleware para la verificacon
const auth = require('../middleware/auth');

// ruta para autenticar los usuarios
// api/auth

router.post('/', 

    authController.autenticarUsuario
);


// Ruta para poder obtener la informacion del usuario que inicia sesion
router.get('/',
    auth,
    authController.verificarUsuario
);

module.exports = router;