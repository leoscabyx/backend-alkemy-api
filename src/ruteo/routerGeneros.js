import { Router } from 'express'

import {
    getGenerosAll,
    postGeneros,
    getGenerosById,
    updateGeneros,
    deleteGeneros,
    addMovieToGenero
} from '../controladores/controladorGeneros.js'

const router = Router();

// Get
router.get('/', getGenerosAll)

router.get('/:id', getGenerosById)

// Post
router.post('/', postGeneros)

// Put
router.put('/:id', updateGeneros)

router.put('/:id/movie/:idMovie', addMovieToGenero)

// Delete
router.delete('/:id', deleteGeneros)

export default router