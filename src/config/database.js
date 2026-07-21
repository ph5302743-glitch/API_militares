import pg from 'pg'
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const conexao = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
})

try {
  const resultado = await conexao.query('SELECT NOW()')
  console.log("Conectado ao banco com sucesso:", resultado.rows[0])
} catch (error) {
  console.error({mensagem: "Erro ao conectar ao banco:", erro: error.message})
}

export default conexao;
