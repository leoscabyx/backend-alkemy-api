import Personaje from '../modelos/Personaje.js'

import Movie from '../modelos/Movie.js'

async function getPersonajesAll (req, res) {
    try {
        const personajes = await Personaje.findAll({ 
            attributes: ['imagen', 'nombre'],
            include: Movie
        })
        res.json(personajes)
    } catch (error) {
        res.json(error)
    }
}

async function getPersonajesById (req, res) {
    try {
        const id = parseInt(req.params.id)
        const personajes = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia'],
            include: Movie
        })
        res.json(personajes)
    } catch (error) {
        res.json(error)
    }
}

async function postPersonajes (req, res) {
    try {
        // const campos = { ...req.body }
        const campos = { 
            imagen: req.body.imagen,
            nombre: req.body.nombre,
            edad: req.body.edad,
            peso: req.body.peso,
            historia: req.body.historia,
        }

        if (!(campos.hasOwnProperty('imagen') 
            && campos.hasOwnProperty('nombre') 
            && campos.hasOwnProperty('edad') 
            && campos.hasOwnProperty('peso') 
            && campos.hasOwnProperty('historia'))) {
            return res.json({ msg: "Debes pasar la imagen, nombre y edad, peso e historia como minimo para crear un personaje"})
        }

        if (req.body.hasOwnProperty('movies')) {
            if(!Array.isArray(req.body.movies)) {
                return res.json({ msg: "Debes pasar un array con objetos con la pelicula o serie relacionada al personaje"})
            }
        }

        const personaje = await Personaje.create(campos)

        if(req.body.movies.length > 0){

            const moviesPromesas = req.body.movies.map( async (movie) => {
                return await Movie.create(movie)
            })
            const movies = await Promise.all(moviesPromesas);

            personaje.addMovies(movies)
        }
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function updatePersonajes (req, res) {
    try {
        const id = parseInt(req.params.id)
        const campos = { ...req.body }
        await Personaje.update(campos, {
            where: {
                id: id
            }
        });
        const personaje = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia']
        })
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

async function deletePersonajes (req, res) {
    try {
        const id = parseInt(req.params.id)
        const personaje = await Personaje.findByPk(id, { 
            attributes: ['imagen', 'nombre', 'edad', 'peso', 'historia']
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