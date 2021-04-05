const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({    // El schema de como los datos estan organizados
    nombre: {
        type: String,           // tipo de dato string o cadena de texto
        require: true,          // Require que el dato es obligatorio
        trim: true              // Trim para quitar los espacios
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,         // Se hasce referencia por Id al modelo donde se guarda el id del usuario registrado
        ref: 'Usuario'                                // Modelo al que se hace la referencia
    },
    creado: {
        type: Date,               // Tipo da dato Date, que genera la fecha.
        default: Date.now()       // Default, 
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);