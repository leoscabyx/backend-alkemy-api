import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite'
});

export {
    sequelize,
    DataTypes
}