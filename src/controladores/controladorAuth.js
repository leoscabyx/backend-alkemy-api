import pkg from 'bcrypt'

import User from '../modelos/User.js'
import { tokenSign } from '../utils/jwt.js'

const bcrypt = pkg

async function postLoginController(req, res) {
    try {
        const body = req.body
        const { dataValues: user } = await User.findOne({ where: { email: body.email} });

        if (!user) {
          res.status(404).json({ error: "Usuario NO Existe"})
          return;
        }

        const checkPassword = bcrypt.compareSync(body.password, user.password)

        if (!checkPassword) {
            res.status(402).json({ error: "Password Invalida"})
          return;
        }
    
        const tokenJwt = await tokenSign(user);

        const data = {
          token: tokenJwt,
          user: user,
        };
    
        res.json(data);
    } catch (error) {
        res.json(error)
    }
}

async function postRegisterController(req, res) {
    try {
        const body = req.body
        const checkIsExist = await User.findOne({ where: { email: body.email} });

        if (checkIsExist) {
            return res.status(401).json({ error: "Usuario ya Existe"})
        }
        
        const password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null)
        const bodyInsert = { ...body, password };

        const newUser = await User.create(bodyInsert)
        
        if(!newUser) {
            res.status(401).json({ error: "No se pudo crear el usuario" })
        }else{
            const data = {
                id: newUser.id,
                data: bodyInsert
            }
            res.status(201).json(data)
        }
        
    } catch (error) {
        res.json(error)
    }
}



export {
    postLoginController,
    postRegisterController
}
