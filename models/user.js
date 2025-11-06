import { DataTypes } from 'sequelize';
import sequelize from '../db.js';      

const User = sequelize.define('User', {
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Cet email est déjà utilisé !'
    },
    validate: {
      isEmail: {
        msg: 'Adresse email invalide.'
      }
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'User',
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

export default User;