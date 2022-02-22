import { Router } from 'express'

import {
    getMoviesAll,
    postMovies,
    getMoviesById,
    updateMovies,
    deleteMovies
} from '../controladores/controladorMovies.js'

const router = Router();

// Get
router.get('/', getMoviesAll)

router.get('/:id', getMoviesById)

// Post
router.post('/', postMovies)

// Put
router.put('/:id', updateMovies)

// Delete
router.delete('/:id', deleteMovies)

export default router