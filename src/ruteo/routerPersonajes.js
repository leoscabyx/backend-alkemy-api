import { Router } from 'express'

import {
    getPersonajesAll,
    postPersonajes,
    getPersonajesById,
    updatePersonajes,
    deletePersonajes,
    addMovieToCharacter
} from '../controladores/controladorPersonajes.js'

const router = Router();

// Get
router.get('/', getPersonajesAll)

router.get('/:id', getPersonajesById)

// Post
router.post('/', postPersonajes)

// Put
router.put('/:id', updatePersonajes)

router.put('/:id/movie/:idMovie', addMovieToCharacter)

// Delete
router.delete('/:id', deletePersonajes)

export default router