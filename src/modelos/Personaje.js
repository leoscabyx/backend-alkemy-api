import { sequelize, DataTypes } from './index.js'

const Personaje = sequelize.define('Personaje', {

    imagen: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 y 255 caractares"
        }
      }
    },
    edad: {
      type: DataTypes.NUMBER,
      validate: {
        isInt: {
          args: true,
          msg: "La edad tiene que ser un numero entero"
        },
        min: {
          args: 1,
          msg: "La edad debe ser igual o mayor a 1"
        },
        max: {
          args: 150,
          msg: "La edad debe ser igual o menor a 150"
        }
      }
    },
    peso: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 1,
          msg: "La edad debe ser igual o mayor a 1"
        },
        max: {
          args: 150,
          msg: "La edad debe ser igual o menor a 150"
        }
      }
    },
    historia: {
      type: DataTypes.TEXT
    }
  }
);

export default Personaje