import Movie from '../modelos/Movie.js'

import Personaje from '../modelos/Personaje.js'

async function getMoviesAll (req, res) {
    try {
        const movies = await Movie.findAll({ 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion'],
            include: Personaje
        })
        res.json(movies)
    } catch (error) {
        res.json(error)
    }
}

async function getMoviesById (req, res) {
    try {
        const id = parseInt(req.params.id)
        const movies = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion'],
            include: Personaje
        })
        res.json(movies)
    } catch (error) {
        res.json(error)
    }
}

async function postMovies (req, res) {
    try {
        const campos = { ...req.body }
        if (!(campos.hasOwnProperty('imagen') && campos.hasOwnProperty('titulo') && campos.hasOwnProperty('fecha') && campos.hasOwnProperty('calificacion'))) {
            return res.json({ msg: "Debes pasar la imagen, titulo, fecha y calificacion como minimo para crear un pelicula o serie"})
        }
        const movie = await Movie.create(campos)
        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

async function updateMovies (req, res) {
    try {
        const id = parseInt(req.params.id)
        const campos = { ...req.body }
        await Movie.update(campos, {
            where: {
                id: id
            }
        });
        const movie = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion']
        })
        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

async function deleteMovies (req, res) {
    try {
        const id = parseInt(req.params.id)
        const movie = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion']
        })
        await Movie.destroy({
            where: {
                id: id
            }
        });
        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

export {
    getMoviesAll,
    postMovies,
    getMoviesById,
    updateMovies,
    deleteMovies
}