import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importando o pacote cors
import userRoutes from './Routes/usersRoutes.js'; 
import tokenRoutes from './Routes/tokenRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// Configuração do CORS para permitir requisições do frontend (localhost:3000)
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/token', tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
