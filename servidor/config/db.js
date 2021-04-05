const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {

    try {
        await mongoose.connect( process.env.DB_MONGO, {   // palabra secreta para lo configuracion, y el objeto de configuracion
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("Base de datos conectada correctamente");
    } catch (error) {
        console.log(error); // Mandar el error a consola
        process.exit(1); // Detener la aplicacion en caso de no conectarse
    }
};

module.exports = conectarDB;