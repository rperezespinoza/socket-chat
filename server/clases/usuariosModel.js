class UsuariosModel {

    constructor() {
        this.personas = []
    }

    agregarPersonas(id, nombre, sala) {

        console.log(this.personas.filter(p => p.nombre === nombre).length);

        //if (this.personas.filter(p => p.nombre === nombre).length == 0) {

        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);
        //}

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {
        let personasPorSala = this.personas.filter(p => p.sala === sala);
        return personasPorSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(p => p.id != id);
        return personaBorrada;
    }
}

module.exports = {
    UsuariosModel
}