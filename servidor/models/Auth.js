
// Modelo para la verificacion de datos.
const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Auth', AuthSchema);