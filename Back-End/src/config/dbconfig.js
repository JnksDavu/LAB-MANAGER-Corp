import { MongoClient } from 'mongodb';

export default async function conectarAoBanco() {
    let mongoClient;

    try {
        mongoClient = new MongoClient("mongodb+srv://joaoschneider:d8CnXtyaSnNOaueT@cluster0.1kcw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}