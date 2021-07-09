const express = require('express');
const conectarDB = require('./config/db');
const usuariosRouter = require('./routes/usuarios.route');
const authRouter = require('./routes/auth.route');
const proyectosRouter = require('./routes/proyectoRoute');
const tareaRouter = require('./routes/tareaRoute')
const cors = require('cors');
//crear el servidor
const app = express();

// Conectar a la base de Datos
conectarDB();

// Habilitar Express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// Cors para evitar conflictos
app.use(cors())
//Importar Rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/auth', authRouter);
app.use('/api/proyectos', proyectosRouter);
app.use('/api/tareas', tareaRouter)
// definir la pagina principal


// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}`)
})