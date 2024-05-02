const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/miBaseDeDatos', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hash: { type: String, required: true, unique: true },  // Nuevo campo para el hash
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },  // Tiempo total en horas
  bankAccount: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;