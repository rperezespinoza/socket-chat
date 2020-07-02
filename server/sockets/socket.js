const { io } = require('../server');
const { UsuariosModel } = require('../clases/usuariosModel');
const { crearMensaje } = require('../util/util');

const usuario = new UsuariosModel();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        let personas = usuario.agregarPersonas(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuario.getPersonaPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió.`));

        callback(usuario.getPersonaPorSala(data.sala));
        console.log(usuario);
    });

    client.on('crearMensaje', (data, callback) => {
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    })

    client.on('disconnect', () => {
        let personaBorrada = usuario.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat.`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuario.getPersonaPorSala(personaBorrada.sala));
    })

    client.on('mensajePrivado', (data) => {
        let persona = usuario.borrarPersona(client.id);
        client.broadcast.to(data.para).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));

    });



});