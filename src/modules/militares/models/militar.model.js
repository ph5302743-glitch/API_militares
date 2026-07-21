import conexao from "../../../config/database.js"

class militarModel {

    static async cadastrar(id, nome, graduacao, setor) {
        const dados = [id, nome, graduacao, setor]
        const query = `INSERT into militar(id, nome, graduacao, setor) values ($1, $2, $3, $4) returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async listarTodos() {
        const query = `select * from militar`
        const resultado = await conexao.query(query)
        return resultado.rows
    }

    static async listarPorId(id) {
        const dados = [id]
        const query = `select * from militar where id = $1`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async editarTotal(id, nome, graduacao, setor) {
        const filmes = await militarModel.listarPorId(id)

        if (filmes.length === 0) {
            return null
        }

        const dados = [id, nome, graduacao, setor]
        const query = `update militar set nome = $2, graduacao = $3, setor = $4 where id = $1 returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async editarParcial(id, nome, graduacao, setor) {
        const militares = await militarModel.listarPorId(id)

        if (militares.length === 0) {
            return null
        }

        const militar = militares[0]

        const dados = [ 
            id, 
            nome || militar.nome,
            graduacao || militar.graduacao,
            setor || militar.setor
        ]

        const query = `update militar set nome = $2, graduacao = $3, setor = $4 where id = $1 returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async excluirPorId(id) {
        const militares = await militarModel.listarPorId(id)
        if (militares.length === 0) {
            return null
        }
        const dados = [id]
        const query = `delete from militar where id = $1 returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows
    }

    static async excluirTodos() {
        const query = `delete from militar returning *`
        const resultado = await conexao.query(query)
        return resultado.rows;
    }
}
export default militarModel;