// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController');
const auth = require('../middlewares/auth');
//  Iniciar Sesión
// api/auth
router.post('/',

    autenticarUsuario
)
// Obtiene el usuario Autenticado
router.get('/', auth, usuarioAutenticado)
module.exports = router;
