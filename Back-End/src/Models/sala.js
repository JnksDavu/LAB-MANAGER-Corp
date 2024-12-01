import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import conectarAoBanco from "../config/dbconfig.js";

dotenv.config();
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Gera automaticamente IDs incrementais
    primaryKey: true,    // Define como chave primária
  },
  nomeSala: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroComputadores: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  possuiAcessibilidade: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  statusSala: {
    type: DataTypes.ENUM('Disponível', 'Ocupado', 'Bloqueado', 'Manutenção'),
    allowNull: false,
    defaultValue: 'Disponível',
  },
  softwaresInstalados: {
    type: DataTypes.ARRAY(DataTypes.STRING),  // Array de strings para lista de softwares
    allowNull: true,  // Pode ser nulo se nenhuma lista for fornecida
  }
}, {
  tableName: 'salas',  // Nome da tabela no banco de dados
  timestamps: true, 
  createdAt: 'createdat',  
  updatedAt: 'updatedat',  
});

export default Sala;
