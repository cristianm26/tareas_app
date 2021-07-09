const express = require('express');
const { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectoController');
const auth = require('../middlewares/auth');
const router = express.Router();
const { check } = require('express-validator');
//Crea proyectos
router.post('/',
    auth,
    [
        check('nombre', ' El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    crearProyecto
)

// Obtener todos los proyectos
router.get('/',
    auth,
    obtenerProyectos
)

// Actualizar proyectos via ID
router.put('/:id',
    auth,
    [
        check('nombre', ' El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    actualizarProyecto
)

// Eliminar un proyecto
router.delete('/:id',
    auth,
    eliminarProyecto
)

module.exports = router;