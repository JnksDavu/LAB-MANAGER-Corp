import run from "../config/dbconfig.js"; 

const conexao = await run(process.env.STRING_CONEXAO); 

export const Sala = conexao.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true,     
  },
  nome_da_sala: {          
    type: DataTypes.STRING,
    allowNull: false,
  },
  lista_softwares: {       
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  status: {                
    type: DataTypes.ENUM('Disponível', 'Ocupado', 'Bloqueado', 'Manutenção'),
    allowNull: false,
    defaultValue: 'Disponível',
  },
  tem_acessibilidade: {    
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  numero_de_pcs: {        
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'sala',        
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat',
});

export async function getAllSalas() {
  return Sala.findAll();    
}
