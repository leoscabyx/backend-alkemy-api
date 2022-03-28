import Movie from '../modelos/Movie.js'

import Personaje from '../modelos/Personaje.js'

import { sequelize } from '../db/index.js'

async function getMoviesAll (req, res) {
    try {

        const [ filter ] = Object.keys(req.query)
        const dato = req.query[filter]

        if (filter) {
            if (!(filter === "name" || filter === "genre" || filter === "order")) {
                return res.json({ error: "El filtro solo acepta name, genre o order" })
            }

            if (filter === "name") {
                const results = await Movie.findOne({ where: { titulo: dato } });
                
                if (!results) {
                    return res.json({ error: "No se han encontrado peliculas o series" })
                }

                const { dataValues: movie } = results
                return res.json(movie)
            }

            if (filter === "genre") {
                const [ results ] =  await sequelize.query(`select * from Movie_Genero where GeneroId = ${dato}`);
                
                if (results.length === 0) {
                    return res.json({ error: "No se han encontrado las peliculas o series" })
                }

                const movies = []
                for (const item of results) {
                    
                    const movie = await Movie.findByPk(item.MovieId, { 
                        attributes: ['imagen', 'titulo', 'fecha', 'calificacion']
                    })
                    
                    movies.push(movie)
                }
                return res.json(movies)
                
                // Falta
                // return res.json({ msj: "Aun no esta implementado alguna solucion para el filtro... "})
            }

            if (filter === "order") {
                const results =  await Movie.findAll({
                    order: [
                        ['titulo', dato],
                    ]
                })
                
                if (results.length === 0) {
                    return res.json({ error: "No se han encontrado peliculas o series" })
                }

                const movies = results
                return res.json(movies)
            } 
        }

        const movies = await Movie.findAll({ 
            attributes: ['imagen', 'titulo', 'fecha']
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

async function addCharacterToMovie (req, res) {
    try {
        const id = parseInt(req.params.id)
        const idCharacter = parseInt(req.params.idCharacter)

        const [ results ] =  await sequelize.query(`select * from Personaje_Movie where PersonajeId = ${idCharacter} and MovieId = ${id}`);
        
        const [ personaje_movie ] = results
        
        if (personaje_movie) {
            return res.json({ error: "Ya esta asociada este personaje a la pelicula"})
        }

        const movie = await Movie.findByPk(id)
        const personaje = await Personaje.findByPk(idCharacter)
    
        if (!personaje) {
            return res.json({ error: "No se ha encontrado el personaje"})
        }
    
        if (!movie) {
            return res.json({ error: "No se ha encontrado la pelicula o serie"})
        }
    
        personaje.addMovies(movie)
    
        res.json(personaje)
    } catch (error) {
        res.json(error)
    }
}

export {
    getMoviesAll,
    postMovies,
    getMoviesById,
    updateMovies,
    deleteMovies,
    addCharacterToMovie
}