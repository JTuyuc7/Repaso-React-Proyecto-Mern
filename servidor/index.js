const express = require('express');

//Importar la funcion para conecta la DB
const conectarDB = require('./config/db');

// Importar cors para habilitar las peticiones de dos url´s distintas
const cors = require('cors');

// Crear el servidor
const app = express();

//Realizar la coneccion
conectarDB();

//Habilitar Cors
app.use( cors() );

//Habilitar express.json
app.use(express.json({ extended: true }))

// Crear un puerto
const PORT = process.env.PORT || 4000;

//Importar el route de tarea
app.use('/api/usuarios', require('./routes/usuarios'));

// Importar el route de autenticar usuarios
app.use('/api/auth', require('./routes/auth'));

// Crear la ruta para los proyectos
app.use('/api/proyectos', require('./routes/proyectos'));

//Crear la ruta de las tareas
app.use('/api/tareas', require('./routes/tarea'));

//Arrancamos la pp
app.listen( PORT, () => {
    console.log(`El puerto funcionando en el puerto ${PORT}`);
});