import { Router } from 'express'

import {
    getGenerosAll,
    postGeneros,
    getGenerosById,
    updateGeneros,
    deleteGeneros
} from '../controladores/controladorGeneros.js'

const router = Router();

// Get
router.get('/', getGenerosAll)

router.get('/:id', getGenerosById)

// Post
router.post('/', postGeneros)

// Put
router.put('/:id', updateGeneros)

// Delete
router.delete('/:id', deleteGeneros)

export default router