import { Router } from 'express'

import {
    getMoviesAll,
    postMovies,
    getMoviesById,
    updateMovies,
    deleteMovies,
    addCharacterToMovie
} from '../controladores/controladorMovies.js'

const router = Router();

// Get
router.get('/', getMoviesAll)

router.get('/:id', getMoviesById)

// Post
router.post('/', postMovies)

// Put
router.put('/:id', updateMovies)

router.put('/:id/character/:idCharacter', addCharacterToMovie)

// Delete
router.delete('/:id', deleteMovies)

export default router