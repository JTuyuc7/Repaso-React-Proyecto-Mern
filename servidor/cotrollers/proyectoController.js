//Importar el modelo de los poryectos
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crear el controlador de los proyecto
exports.crearProyecto = async (req, res) => {

    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    } 
    
    try {
        
        // Verificar que el usuario este autenticado para agregar proyectos

        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Extraer el usuario quien crea el proyectos
        proyecto.creador = req.usuario.id;

        // Guardar el proyecto
        proyecto.save();

        res.json(proyecto);

        // Guardar la nueva tarea

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "El proyecto no se pudo guardar "});
    }

}

// Funcion para obtener los proyectos por el usuario
exports.obternerProyectos = async ( req, res ) => {

    try {
        
        //Traer los proyectos por el creador de los mismos
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado : -1 });
        res.json({proyectos});
        

    } catch (error) {
        res.status(500).json({ msg: "Usuario no Encontrado"})
    }
}

// Actualizar los proyectos
exports.actualizarProyecto = async (req, res) => {

    // Revisar que no existan errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() }) 
    }
    
    // Extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        
        // Revisar el ID del proyecto
        let proyecto = await Proyecto.findById(req.params.id);     //Crear una variable que almacene el proyecto por el ID

        // Revisar si el proyecto existe o no
        if( !proyecto ) {
            return res.status(404).json({ msg: "Proyecto no encontrado "});    //Si el proyecto no existe mostrar un error
        }
        // Verificar que el creador del proyecto se el mismo
        if( proyecto.creador.toString() !== req.usuario.id ){    // Revisar que el proyecto id sea el mismo que el del usuario quien creo el proyecto
            return res.status(401).json({ msg: "Sin acceso a editar estos proyectos"});
        }

        // Actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto }, { new: true });

        //Retornar el proyecto actualizado
        res.json({ proyecto });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Hubo un error al ctualizar el proyecto"})
    }
}

// Funcion para eliminar proyectos
exports.eliminarProyecto = async (req, res ) => {

    // Validar que no existan errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores : errores.array() });
    }

    try {
        
            //Verificar que el proyecto exista
        let proyecto = await Proyecto.findById( req.params.id );

        if( !proyecto ) {
            return res.status(404).json({ msg: "Proyecto no encontrado "})
        }

        //Revisar que el usuario tenga acceso a los proyectos
        if( proyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: "No tienes acceso a los proyectos"});
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id })

        res.json({ msg: "Proyecto Eliminado con exito"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error intenta mas tarde"});
    }

}