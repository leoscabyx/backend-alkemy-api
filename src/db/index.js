import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite'
});

const dbConnect = async () => {
  try {
    // await sequelize.authenticate();
    // Forzar a true: para drop tablas
    await sequelize.sync({ force: false }); 
    console.log('Conexion establecida con la DB.');
  } catch (error) {
    console.error('No se puede conectar a la DB:', error);
  }
}

export {
    sequelize,
    DataTypes,
    dbConnect
}