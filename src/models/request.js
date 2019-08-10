const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = Schema({
  title: String,
  userid: String,
  providername: String,
  requestdate: String,
  category: String,
  rating: String,
  description: String,
  comentario: {
    type: String,
    default: "Sin Comentarios"
    },
  precio: {
    type: String,
    default: "Por Confirmar"
    },
  estado: {
  type: String,
  default: "En Espera"
  },
  status: {
  type: Boolean,
  default: false
  }
});

module.exports = mongoose.model('requests', RequestSchema);
