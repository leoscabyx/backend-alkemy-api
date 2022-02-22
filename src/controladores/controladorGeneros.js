import Genero from '../modelos/Genero.js'

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
        res.json(generos)
    } catch (error) {
        res.json(error)
    }
}

async function postGeneros (req, res) {
    try {
        const campos = { ...req.body }
        if (!(campos.hasOwnProperty('imagen') && campos.hasOwnProperty('nombre'))) {
            return res.json({ msg: "Debes pasar la imagen y nombre como minimo para crear un genero"})
        }
        const genero = await Genero.create(campos)
        res.json(genero)
    } catch (error) {
        res.json(error)
    }
}

async function updateGeneros (req, res) {
    try {
        const id = parseInt(req.params.id)
        const campos = { ...req.body }
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

export {
    getGenerosAll,
    postGeneros,
    getGenerosById,
    updateGeneros,
    deleteGeneros
}