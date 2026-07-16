import express from "express";
import dotenv from "dotenv";
import router from "../src/modules/militares/routes/militar.route.js";

dotenv.config();
const app = express()

app.use(express.json())

app.use(router)

const porta = process.env.PORTA || 3000

app.get("/", (req, res) => {
    try {
        res.status(200).json({ mensagem: "API funcionando com sucesso", status: "OK", date: new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Recife" })})
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao inicar API!", erro: error.message });
    }
});

app.listen(porta, () => {
    console.log(`servidor em execução: http://localhost:${porta}`)
})