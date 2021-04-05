const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//Importar el controlador de las tareas
const tareaController = require('../cotrollers/tareaController');

// Importar el middleware para la autorizacion
const auth = require('../middleware/auth');




// Crear la ruta de las tareas
router.post('/',
    auth,           // Middelware para la autorizacion
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
);


// Obtener todas las tareas por usuario y proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);


// Actualizar una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

// Elimaar una tarea
router.delete('/:id',
    auth,
    tareaController.elimiarTarea
);


module.exports = router;