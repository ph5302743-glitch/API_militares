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

    }                           //info passada pelo usuario
    static async buscarPorEmail(email){
                        //tranformando em array
        const dados = [email]
                        //texto que sera executado no BD
        const query = `SELECT email from admins where email = $1`
                        //conexão com o BD  query= texto que executara no banco
             //guarda o resultado da consulta  //  dados= os dados que o usuario passou 
        const res = await conexao.query(query, dados)
        //retorna o resultado
        return res.rows
    }

}

export default AdministradorModel