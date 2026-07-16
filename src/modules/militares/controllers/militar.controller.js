import militarModel from "../models/militar.model,js";

class militarModel {
    static async cadastrar(id, nome, graduacao, setor){
        const dados = [id, nome, graduacao, setor]
        const query = `insert into militar(id, nome, graduacao, setor) values ($1, $2, $3, $4, $5, $6, $7) returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async listarTodos(){
        const query = `select * from militar`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }
}

export default militarController;