import conexao from "../../../config/database.js"

class AdministradorModel{
    static async cadastrar(id, nome, email, senha){
        const dados = [id, nome, email, senha]
        const query = `INSERT INTO admins(id, nome, email, senha) values (1$, $2. $3, $4) returning *`
        const res = await conexao.query(query, dados)

        return res.rows
    }

    static async contarAdmins(){
        const query = `SELECT COUNT(*) from admins`
        const res = await conexao.query(query)
        return Number(res.rows)

    }
    static async buscarPorEmail(){
        const dados = [email]
        const query = `SELECT email from admins where email = $1`
        const res = await conexao.query(query, dados)
        return res.rows
    }

}

export default AdministradorModel