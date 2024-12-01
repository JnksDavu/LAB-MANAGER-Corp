import run from "../config/dbconfig.js";

const conexao = await run(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db = conexao.db("labmanager");
    const colecao = db.collection("user");
    return colecao.find().toArray();
}

/*
    A maioria dos campos é String os que não forem são especificados sçao String.

    Coleção user tem o seguinte documento id(Gera automático), nome, senha.

    Coleção sala tem o seguinte documento id(Gera automático), nome_da_sala, lista_softwares, status, tem_acessibilidade, numero_de_pcs(Numérico)

*/    


