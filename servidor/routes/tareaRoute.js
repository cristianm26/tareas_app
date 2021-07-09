const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const { check } = require('express-validator');
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tareaController');
//Crea tarea
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    crearTarea
)

// Obtener las tareas por proyecto
router.get('/',
    auth,
    obtenerTareas
)

// Actualizar tarea via ID
router.put('/:id',
    auth,
    actualizarTarea
)

// Eliminar una tarea
router.delete('/:id',
    auth,
    eliminarTarea
)

module.exports = router;