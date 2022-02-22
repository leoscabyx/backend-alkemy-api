import { sequelize, DataTypes } from './index.js'

const Genero = sequelize.define('Genero', {

    imagen: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
    }
  }
);

export default Genero