import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdministratorModel from "../models/admin.model.js";

class AdministradorController {


static async cadastrar(req, res) {
    try {
        const { id, nome, email, senha } = req.body;

        if (!id || !nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios!"
            });
        }

        const totalAdmin = await AdministratorModel.contarAdmins();

        if (totalAdmin > 0) {
            return res.status(409).json({
                mensagem: "Administrador já cadastrado!"
            });
        }

        const regexSenha =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;

        if (!regexSenha.test(senha)) {
            return res.status(403).json({
                mensagem:
                    "Senha inválida! Sua senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial."
            });
        }

        const regexEmail =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

        if (!regexEmail.test(email)) {
            return res.status(403).json({
                mensagem: "E-mail inválido. Por favor, forneça um e-mail válido!"
            });
        }

        const hashSenha = await bcrypt.hash(senha, 10);

        await AdministratorModel.cadastrar(
            id,
            nome,
            email,
            hashSenha
        );

        return res.status(201).json({
            mensagem: "Usuário administrador criado com sucesso!"
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao cadastrar administrador",
            erro: error.message
        });
    }
}

static async login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Forneça o e-mail e a senha para o login."
            });
        }

        const administrador =
            await AdministratorModel.buscarPorEmail(email);

        // Caso o Model retorne um array
        if (!administrador || administrador.length === 0) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        const admin = Array.isArray(administrador)
            ? administrador[0]
            : administrador;

        if (admin.ativo === false) {
            return res.status(403).json({
                mensagem: "Administrador inativo."
            });
        }

        const verificarSenha = await bcrypt.compare(
            senha,
            admin.senha
        );

        if (!verificarSenha) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TEMPO_EXPIRACAO
            }
        );

        return res.status(200).json({
            mensagem: "Usuário autenticado com sucesso!",
            token
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao realizar login.",
            erro: error.message
        });
    }
}
static async perfil(req, res){
    try {
        const administrador = await AdministratorModel.buscarPorEmail(req.administrador.email)
        if(administrador.length === 0){
            return res.status(409).json({mensagem: "Usuario precisa fazer login!"})
        }
        res.status(200).json(administrador)
    } catch (error) {
        res.status(500).json({mensagem: "Erro ao buscar perfil do usuario!", erro: error.message})
    }
}

}

export default AdministradorController;
