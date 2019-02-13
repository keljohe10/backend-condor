var express = require('express');
var app = express();
var Usuarios = require('../models/usuario');

// ================================
// Obtener todos los usuarios
// ================================

app.get('/', (req, res, next) => {

    Usuarios.find({}, 'nombre email role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            });
});


// ================================
// Crear un usuarios
// ================================

app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error creando usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuarios: usuarioGuardado
        });
    });


});



module.exports = app;