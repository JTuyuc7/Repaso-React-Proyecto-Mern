const Tarea = require('../models/Tarea');
//importar el modelo de los datos

// Importar el modelo de los proyectos
const Proyecto = require('../models/Proyecto');

const { validationResult } = require('express-validator');

exports.crearTarea = async ( req, res ) => {

    // Validar que no existan errores al insertar una tarea
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    } 

    try {
        
        const { proyecto } = req.body;
        const proyectoExiste = await Proyecto.findById( proyecto );

        if( !proyectoExiste ){                                                       // Revisar que el proyecto exista
            return res.status(401).json({ msg: "Proyecto no encontrado "});
        }

        if( proyectoExiste.creador.toString() !== req.usuario.id ){    // Revisar que el proyecto id sea el mismo que el del usuario quien creo el proyecto
            return res.status(401).json({ msg: "Sin acceso a editar estos proyectos"});
        }

        // Crear la tarea
        const tarea = new Tarea(req.body);

        await tarea.save();

        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al guardar la tarea"});
    }
    
}

// Controlador para obtener las tares por proyecto
exports.obtenerTareas = async ( req, res ) => {

    /*
    // Revisar que no hayan errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });      //Revisar que no existan errores dado caso retornar un arreglo con los errores
    }
    */

    try {
        
        // extraer el proyecto
        const { proyecto } = req.query;
        //console.log(req.query);

        // validar que el proyecto sea valido
        const proyectoExiste = await Proyecto.findById( proyecto );
        if( !proyectoExiste ) {
            return res.status(401).json({ msg: "El proyecto no Existe "});
        }

        // verificar que la persona pueda acceder a los proyectos
        if( proyectoExiste.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: "No tienes acceso a estas tareas"});
        }

        // Obtener las tareas del proyecto seleccionado
        const listaproyectos = await Tarea.find({ proyecto }).sort({ creado: -1});
        res.json({ listaproyectos });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "No tienes acceso a ver los proyectos"});
    }
}

// Metodo para actualizar las tareas
exports.actualizarTarea = async ( req, res ) => {

    // Revisar que no existan errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        // Extraemos el nombre de la tarea
        const { nombre, proyecto, estado } = req.body;

        // Validar que el proyecto exista
        const proyectoExiste = await Proyecto.findById( proyecto );
        if( !proyectoExiste ){
            return res.status(404).json({ msg: "El proyecto no existe" });
        }

        // Revisar que el proyecto pertenezca al usuario que esta autenticado
        if( proyectoExiste.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: "No tienes acceso a estas tareas "});
        }

        //Verificar que exista la tarea
        let tarea = await Tarea.findById( req.params.id );
        if( !tarea ){
            return res.status(401).json({ msg: "La tarea no existe "});
        }

        //Crear un nuevo objeto con la nueva informacion
        const nuevaTarea = {};

        // Si el usuario decide cambiar el nombre del proyecto
        nuevaTarea.nombre = nombre;

        //si el usuario decide cambiar el estado de la tarea
        nuevaTarea.estado = estado;

        // Guardar los cambios de la nueva tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true});

        // Retornar la nueva tarea
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "La tarea no se pudo actualizar" });
    }
}

// Metodo para eliminar las tareas
exports.elimiarTarea = async ( req, res ) => {

    // Revisar que no existan errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //Extraer el proyecto
        const { proyecto } = req.query;

        // Verificar que la tarea exista
        let tarea = await Tarea.findById( req.params.id );
        if( !tarea ){
            return res.status(401).json({ msg: "La tarea no existe" });
        }

        // Verificar que el proyecto exista
        const existeProyecto = await Proyecto.findById( proyecto );
        if( !existeProyecto ){
            return res.status(401).json({ msg: "La tarea no existe para ese proyecto" });
        }

        // Revisar que el usuario tenga acceso a eliminar las tareas
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: "No tienes acceso a estas tareas "});
        }

        await Tarea.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: "La tarea se elimino con exito"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "La tarea no se pudo eliminar"});
    }
}
