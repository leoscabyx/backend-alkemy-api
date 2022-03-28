import Genero from '../modelos/Genero.js'

import Movie from '../modelos/Movie.js'

import { sequelize } from '../modelos/index.js'

async function getGenerosAll (req, res) {
    try {
        const generos = await Genero.findAll({ 
            attributes: ['imagen', 'nombre']
        })
        res.json(generos)
    } catch (error) {
        res.json(error)
    }
}

async function getGenerosById (req, res) {
    try {
        const id = parseInt(req.params.id)
        const generos = await Genero.findByPk(id, { 
            attributes: ['imagen', 'nombre']
        })
        if (!generos) {
            return res.json({ error: "No se ha encontrado el genero"})
        }
        res.json(generos)
    } catch (error) {
        res.json(error)
    }
}

async function postGeneros (req, res) {
    try {
        const campos = req.body
        if (!(campos.hasOwnProperty('imagen') && campos.hasOwnProperty('nombre'))) {
            return res.json({ msg: "Debes pasar la imagen y nombre como minimo para crear un genero"})
        }
        const genero = await Genero.create(campos)

        if (!genero) {
            return res.json({ error: "No se ha podido crear el genero"})
        }

        res.json(genero)
    } catch (error) {
        res.json(error)
    }
}

async function updateGeneros (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Genero.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado le genero"})
        }

        const campos = req.body
        await Genero.update(campos, {
            where: {
                id: id
            }
        });
        const genero = await Genero.findByPk(id, { 
            attributes: ['imagen', 'nombre']
        })
        res.json(genero)
    } catch (error) {
        res.json(error)
    }
}

async function deleteGeneros (req, res) {
    try {
        const id = parseInt(req.params.id)

        const checkExist = await Genero.findByPk(id)

        if (!checkExist) {
            return res.json({ error: "No se ha encontrado le genero"})
        }

        const genero = await Genero.findByPk(id, { 
            attributes: ['imagen', 'nombre']
        })
        await Genero.destroy({
            where: {
                id: id
            }
        });
        res.json(genero)
    } catch (error) {
        res.json(error)
    }
}

async function addMovieToGenero (req, res) {
    try {
        const id = parseInt(req.params.id)
        const idMovie = parseInt(req.params.idMovie)

        const [ results ] =  await sequelize.query(`select * from Movie_Genero where MovieId = ${idMovie} and GeneroId = ${id}`);
        
        const [ genero_movie ] = results
        
        if (genero_movie) {
            return res.json({ error: "Ya esta asociada esta pelicula a este genero"})
        }

        const genero = await Genero.findByPk(id)
        const movie = await Movie.findByPk(idMovie)
    
        if (!movie) {
            return res.json({ error: "No se ha encontrado la pelicula o serie"})
        }
    
        if (!genero) {
            return res.json({ error: "No se ha encontrado el genero"})
        }
    
        movie.addGeneros(genero)
    
        res.json(movie)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export {
    getGenerosAll,
    postGeneros,
    getGenerosById,
    updateGeneros,
    deleteGeneros,
    addMovieToGenero
}