const Proyecto = require("../models/Proyecto");
const { validationResult } = require('express-validator');

const crearProyecto = async (req, res) => {


    // Revisar si hay errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(400).json({
            errores: errores.array()
        })
    }

    try {
        // Crear un nuevo Proyecto
        const proyecto = new Proyecto(req.body);
        // guardar el creado via JWT
        proyecto.creador = req.usuario.id;
        // guardamos el proyecto
        proyecto.save();
        res.json(proyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}


// Obtiene todos los proyectos del usuario actual
const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

// Actualiza u proyecto
const actualizarProyecto = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(400).json({
            errores: errores.array()
        })
    }

    //Extraer la informacion del proyecto
    const { nombre } = req.body;

    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        // Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)
        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).send('Proyetco no encontrado')
        }
        // verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' })
        }
        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true })

        res.json({ proyecto })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

// Eliminar un proyecto por ese ID
const eliminarProyecto = async (req, res) => {
    try {
        // Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)
        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).send('Proyetco no encontrado')
        }
        // verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No Autorizado' })
        }

        // Eliminar el Proyecto
        await Proyecto.findByIdAndRemove({ _id: req.params.id })
        res.json({ msg: 'Proyecto Eliminado' })


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

module.exports = {
    crearProyecto,
    obtenerProyectos,
    actualizarProyecto,
    eliminarProyecto

}
