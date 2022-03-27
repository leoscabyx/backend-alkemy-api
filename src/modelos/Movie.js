import { sequelize, DataTypes } from './index.js'

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

export default Movie