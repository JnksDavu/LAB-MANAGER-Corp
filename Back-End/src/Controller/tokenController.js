import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';
const TOKEN_EXPIRATION = '24h'; 

let token = null;
let tokenExpiry = null;

// Função para gerar um novo token
const generateToken = () => {
  return jwt.sign({}, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

// Atualiza o token se expirado ou não existe
export const updateToken = () => {
  const now = new Date();
  if (!token || !tokenExpiry || now >= tokenExpiry) {
    token = generateToken();
    tokenExpiry = new Date(now.getTime() + 5 * 60 * 60 * 1000); 
  }
};

// Função para obter o token
export const getToken = () => {
  updateToken();
  return token;
};
