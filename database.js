const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, { useCreateIndex:true, useNewUrlParser: true })
    .then(db => console.log('Conexión exitosa con la Base de Datos'))
    .catch(err => console.log(err));