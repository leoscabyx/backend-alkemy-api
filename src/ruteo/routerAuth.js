import { Router } from 'express'

import {
    postLoginController,
    postRegisterController
} from '../controladores/controladorAuth.js'

const router = Router()

router.post(
    '/register',
    postRegisterController
)

router.post(
    '/login',
    postLoginController
)

export default router