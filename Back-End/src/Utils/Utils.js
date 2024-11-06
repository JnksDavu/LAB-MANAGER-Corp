import crypto from 'crypto';


const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes-256-cbc",
    segredo: "chavespadrao12345678901234567890", // Segredo com exatamente 32 caracteres
    tipo: "hex",
  };
  
  export function criptografar(senha) {
    const iv = crypto.randomBytes(16); // Gerar um novo IV para cada criptografia
    const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.segredo), iv);
    let criptografado = cipher.update(senha, 'utf8', DADOS_CRIPTOGRAFAR.tipo);
    criptografado += cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    return iv.toString(DADOS_CRIPTOGRAFAR.tipo) + ':' + criptografado; // Armazenar o IV junto com a senha criptografada
  }
  
  export function descriptografar(senhaCriptografada) {
    const [ivHex, senha] = senhaCriptografada.split(':');
    if (!ivHex || !senha) {
      throw new Error("Dados criptografados inválidos");
    }
    const iv = Buffer.from(ivHex, DADOS_CRIPTOGRAFAR.tipo);
    const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.segredo), iv);
    let descriptografado = decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo, 'utf8');
    descriptografado += decipher.final('utf8');
    return descriptografado;
  }