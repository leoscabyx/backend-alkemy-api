import { sequelize, DataTypes } from '../db/index.js'

import Genero from './Genero.js'

const Movie = sequelize.define('Movie', {

    imagen: {
      type: DataTypes.STRING
    },
    titulo: {
      type: DataTypes.STRING,
      unique: true
    },
    fecha: {
      type: DataTypes.STRING
    },
    calificacion: {
      type: DataTypes.NUMBER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }
);

// Asociacion N a N
Movie.belongsToMany(Genero, { through: "Movie_Genero" })
Genero.belongsToMany(Movie, { through: "Movie_Genero" })

export default Movie