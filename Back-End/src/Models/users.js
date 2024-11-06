import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true, // Gera automaticamente IDs incrementais
    primaryKey: true,    // Define como chave primária
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: true, 
  createdAt: 'createdat',  
  updatedAt: 'updatedat',  
});

export default User;
