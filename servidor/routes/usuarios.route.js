// Rutas para crear usuario
const express = require('express');
const { crearUsuario } = require('../controllers/usuarioController');
const router = express.Router();
const { check } = require('express-validator');
// Crea un Usuario
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email Valido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    ],
    crearUsuario)


module.exports = router;
