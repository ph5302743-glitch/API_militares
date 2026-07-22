import bcrypt from "bcryptjs";
import AdministratorModel from "../models/admin.model.js";

class AdministradorController{
    static async cadatrar(req, res){
        try {
            const { id, nome, email, senha } = req.body
            if(!id || !nome || !email || !senha){
                return res.status(400).json({ mensagem: "todos os capos são obrigatorios!"})
            }
            const totalAdmin = await AdministratorModel.contarAdmins()
            if(totalAdmin > 0){
                return res.status(409).json({mensagem: "Administrador ja cadastrado!"})
            }

            if(senha.length < 8){
                return res.status(403).json({mensagem: "A senha deve ter pelo menos 8 caracteres!"})

            }
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/
            if(!regex.test(senha)){
                return res.status(403).json({mensagem: "Senha invalida! Sua senha deve conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial (ex: @, #, $, %)"})
            }

            const salt = bcrypt.genSaltSync(10);
            const hashsenha = bcrypt.hashSync(senha, salt);
            const Administrador = await AdministratorModel.cadastrar(id, nome, email, senha=hashsenha)
            return res.status(201).json({mensagem: "Usuario admin criado com sucesso"})
                                                                                            //SENHA CRIPTOGRafada 
        } catch (error) {
            res.status(500).json({mensagem: "erro ao cadastrar administrador", erro: error.message})
        }
    }
}