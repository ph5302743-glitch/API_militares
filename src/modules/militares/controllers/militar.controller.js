import militarModel from '../models/militar.model.js'

class militarController {

    static async cadastrar(req, res) {
        try {
            const { id, nome, graduacao, setor } = req.body

            const militar = await militarModel.cadastrar(id, nome, graduacao, setor)

            return res.status(201).json({ mensagem: "Militar cadastrado com sucesso!", militar })
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao cadastrar militar", erro: error.message })
        }
    }

    static async listarTodos(req, res) {
        try {
            const militares = await militarModel.listarTodos()

            return res.status(200).json(militares)
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao listar militares", erro: error.message })
        }
    }

    static async listarPorId(req, res) {
        try {
            const { id } = req.params

            const militar = await militarModel.listarPorId(id)

            if (militar.length === 0) {
                return res.status(404).json({ mensagem: "Militar não encontrado" })
            }

            return res.status(200).json(militar)
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar militar", erro: error.message })
        }
    }

    static async editarTotal(req, res) {
        try {
            const { id } = req.params
            const { nome, graduacao, setor } = req.body

            const militar = await militarModel.editarTotal(id, nome, graduacao, setor)

            if (militar === null) {
                return res.status(404).json({ mensagem: "Militar não encontrado" })
            }

            return res.status(200).json({ mensagem: "Militar atualizado com sucesso!", militar })
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao atualizar militar", erro: error.message })
        }
    }

    static async editarParcial(req, res) {
        try {
            const { id } = req.params
            const { nome, graduacao, setor } = req.body

            const militar = await militarModel.editarParcial(id, nome, graduacao, setor)

            if (militar === null) {
                return res.status(404).json({ mensagem: "Militar não encontrado" })
            }

            return res.status(200).json({ mensagem: "Militar atualizado com sucesso!", militar })
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao atualizar militar", erro: error.message })
        }
    }

    static async excluirPorId(req, res) {
        try {
            const { id } = req.params

            const militar = await militarModel.excluirPorId(id)

            if (militar === null) {
                return res.status(404).json({ mensagem: "Militar não encontrado" })
            }

            return res.status(200).json({ mensagem: "Militar excluído com sucesso!", militar })
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao excluir militar", erro: error.message })
        }
    }

    static async excluirTodos(req, res) {
        try {
            const militares = await militarModel.excluirTodos()

            return res.status(200).json({ mensagem: "Todos os militares foram excluídos com sucesso!", militares })
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao excluir militares", erro: error.message })
        }
    }
}

export default militarController;