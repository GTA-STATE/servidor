const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./db');  // Asegúrate de que el archivo db.js esté configurado correctamente

const app = express();

// Middleware para servir archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
  secret: 'secreto',  // Elige una clave secreta para la seguridad de la sesión
  resave: false,
  saveUninitialized: true
}));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/miBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hash = generateHash();  // Generar un hash único
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      hash: hash
    });
    await user.save();
    res.send('Usuario registrado con éxito');
  } catch (error) {
    res.status(500).send('Error registrando el usuario. Error: ' + error.message);
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id;  // Guardar ID de usuario en la sesión
    res.send('Login exitoso');
  } else {
    res.send('Login fallido');
  }
});

// Función para generar un hash único
function generateHash() {
    return '#' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

// Configura el puerto en el que el servidor debe escuchar
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});