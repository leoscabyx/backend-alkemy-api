import express from 'express'

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

app.listen(PORT, async () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`)
})