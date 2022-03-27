import express from 'express'

import { sequelize } from './modelos/index.js'
import routerPersonajes from './ruteo/routerPersonajes.js'
import routerMovies from './ruteo/routerMovies.js'
import routerGeneros from './ruteo/routerGeneros.js'
import routerAuth from './ruteo/routerAuth.js'
import { authJWT } from './utils/jwt.js'

// Aplicacion de Express
const app = express()

// Puerto
const PORT = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    res.json({ msj: 'Hola Mundo Alkemy desde Express & Sequelize'})
})

app.use('/api/auth', routerAuth)
app.use('/api/characters', authJWT, routerPersonajes)
app.use('/api/movies', authJWT, routerMovies)
app.use('/api/genders', authJWT, routerGeneros)

/* Manejar cualquier ruta que no este implementada en el servidor */
app.all('*', (req, res) => {
  res.json({ msg: `ruta '${req.url}' método ${req.method} no implementada`})
})

app.listen(PORT, async () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`)
  try {
    // await sequelize.authenticate();
    // Forzar a true: para drop tablas
    await sequelize.sync({ force: false }); 
    console.log('Conexion establecida con la DB.');
  } catch (error) {
      console.error('No se puede conectar a la DB:', error);
  }
})