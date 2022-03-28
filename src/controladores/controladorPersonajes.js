import Personaje from '../modelos/Personaje.js'

import Movie from '../modelos/Movie.js'

import { sequelize } from '../modelos/index.js'

async function getPersonajesAll (req, res) {
    try {
        const personajes = await Personaje.findAll({ 
            attributes: ['imagen', 'nombre']
        })
        res.json(personajes)
    } catch (error) {
        res.json(error)
    }
}

async function getPersonajesById (req, res) {
    try {
        const id = parseInt(req.params.id)
        const personaje = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia'],
            include: Movie
        })
        if (!personaje) {
            return res.json({ error: "No se ha encontrado el personaje"})
        }
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function postPersonajes (req, res) {
    try {
        
        const campos = req.body

        if (!(campos.hasOwnProperty('imagen') 
            && campos.hasOwnProperty('nombre') 
            && campos.hasOwnProperty('edad') 
            && campos.hasOwnProperty('peso') 
            && campos.hasOwnProperty('historia'))) {
            return res.json({ msg: "Debes pasar la imagen, nombre y edad, peso e historia como minimo para crear un personaje"})
        }

        const personaje = await Personaje.create(campos)
        
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function updatePersonajes (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Personaje.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado el personaje"})
        }

        const campos = req.body
        await Personaje.update(campos, {
            where: {
                id: id
            }
        });
        const personaje = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia'],
            include: Movie
        })
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function deletePersonajes (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Personaje.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado el personaje"})
        }

        const personaje = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia'],
            include: Movie
        })
        
        await Personaje.destroy({
            where: {
                id: id
            }
        });
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function addMovieToCharacter (req, res) {
    try {
        const id = parseInt(req.params.id)
        const idMovie = parseInt(req.params.idMovie)

        const [ results ] =  await sequelize.query(`select * from Personaje_Movie where PersonajeId = ${id} and MovieId = ${idMovie}`);

        const [ personaje_movie ] = results
        
        if (personaje_movie) {
            return res.json({ error: "Ya esta asociada esta pelicula a este personaje"})
        }

        const personaje = await Personaje.findByPk(id)
        const movie = await Movie.findByPk(idMovie)
    
        if (!personaje) {
            return res.json({ error: "No se ha encontrado el personaje"})
        }
    
        if (!movie) {
            return res.json({ error: "No se ha encontrado la pelicula o serie"})
        }
    
        personaje.addMovies(movie)
    
        res.json(personaje)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export {
    getPersonajesAll,
    postPersonajes,
    getPersonajesById,
    updatePersonajes,
    deletePersonajes,
    addMovieToCharacter
}