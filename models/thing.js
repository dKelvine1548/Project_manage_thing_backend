import { DataTypes } from 'sequelize';
import sequelize from '../db.js';      

const Thing = sequelize.define('Thing', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Thing',
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

export default Thing;