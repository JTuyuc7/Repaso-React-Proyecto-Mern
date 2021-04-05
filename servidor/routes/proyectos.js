
const express = require('express');
const router = express.Router();
const proyectoController = require('../cotrollers/proyectoController');
const { check } = require('express-validator');

//Importar el middleware para la creacion de proyectos
const auth = require('../middleware/auth');


// Crea un nuevo proyecto
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Obtener los proyectos
router.get('/',
    auth,
    proyectoController.obternerProyectos
);

//Actualizar un proyecto
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;