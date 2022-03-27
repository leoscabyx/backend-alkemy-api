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
        const movie = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion'],
            include: Personaje
        })
        if (!movie) {
            return res.json({ error: "No se ha encontrado la pelicula"})
        }
        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

async function postMovies (req, res) {
    try {
        const campos = req.body
        if (!(campos.hasOwnProperty('imagen') && campos.hasOwnProperty('titulo') && campos.hasOwnProperty('fecha') && campos.hasOwnProperty('calificacion'))) {
            return res.json({ msg: "Debes pasar la imagen, titulo, fecha y calificacion como minimo para crear un pelicula o serie"})
        }
        const movie = await Movie.create(campos)

        if (!movie) {
            return res.json({ error: "No se ha podido crear la pelicula"})
        }

        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

async function updateMovies (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Movie.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado la pelicula"})
        }

        const campos = req.body
        await Movie.update(campos, {
            where: {
                id: id
            }
        });

        const movie = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion'],
            include: Personaje
        })
        res.json(movie)
    } catch (error) {
        res.json(error)
    }
}

async function deleteMovies (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Movie.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado la pelicula"})
        }

        const movie = await Movie.findByPk(id, { 
            attributes: ['imagen', 'titulo', 'fecha', 'calificacion'],
            include: Personaje
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