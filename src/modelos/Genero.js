import { sequelize, DataTypes } from '../db/index.js'

const Genero = sequelize.define('Genero', {

    imagen: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true
    }
  }
);

export default Genero