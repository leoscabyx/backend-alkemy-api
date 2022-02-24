import express from 'express'

import { sequelize } from './modelos/index.js'
import routerPersonajes from './ruteo/routerPersonajes.js'
import routerMovies from './ruteo/routerMovies.js'
import routerGeneros from './ruteo/routerGeneros.js'

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

app.use('/api/characters', routerPersonajes)
app.use('/api/movies', routerMovies)
app.use('/api/genders', routerGeneros)

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