import { sequelize, DataTypes } from './index.js'

const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }
);

export default User