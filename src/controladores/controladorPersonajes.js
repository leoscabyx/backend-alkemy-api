import Personaje from '../modelos/Personaje.js'

import Movie from '../modelos/Movie.js'

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

        /* if(!Array.isArray(campos.movies)) {
            return res.json({ msg: "Debes pasar un array con objetos con las peliculas o series relacionadas al personaje"})
        }

        if(campos.movies.length === 0) {
            return res.json({ msg: "El array de peliculas o series esta vacio"})
        }

        

        if(campos.movies.length > 0){

            const moviesPromesas = campos.map( async (movie) => {
                return await Movie.create(movie)
            })
            const movies = await Promise.all(moviesPromesas);

            personaje.addMovies(movies)
        } */
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

export {
    getPersonajesAll,
    postPersonajes,
    getPersonajesById,
    updatePersonajes,
    deletePersonajes
}