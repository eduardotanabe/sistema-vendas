const {render} = require('nunjucks')
const db = require('../db/connection')

class UsuarioController {
    // LISTAR TODOS OS USUÁRIOS
    index(req, res) {
        db.query('SELECT * FROM usuario', (err, result) => {
            if (err) {
                console.log(`Houve um erro ao listar os usuários: ${err}`)
            }
            res.render('usuario/listar', {usuarios:result.rows})            
        })
    }

    // CADASTRO DE USUÁRIO
    // Apresentar tela para preencher cadastro
    create(req, res) {
        res.render('usuario/adicionar')
    }

    // Gravar cadastro
    store(req, res) {
        const dados = req.body        
        const query = {
            text: 'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)',
            values: [dados.nome, dados.email, dados.senha]
        } 
        db.query(query, (err, result) => {
            if(err){
                console.log(`Houve um erro: ${err}`)
            }
            res.redirect('/usuario/listar')
        })
    }

    // EDITAR USUÁRIO
    // Apresentar tela para edição com os campos preenchidos
    edit(req, res) {
        const query = {
            text: 'SELECT * FROM usuario WHERE id=$1',
            values: [req.params.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao editar: ${err}`)
            }
            res.render('usuario/editar', {usuario:result.rows[0]})
        })
    }
    // Gravar alteração
    update(req, res) {
        const dados = req.body
        const query = {
            text: 'UPDATE usuario SET nome=$1, email=$2, senha=$3 WHERE id=$4',
            values: [dados.nome, dados.email, dados.senha, dados.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
            res.redirect('/usuario/listar')
        })
    }

    // EXCLUIR USUÁRIO
    delete(req, res) {
        const id = req.params.id
        const query = {
            text: 'DELETE FROM usuario WHERE id=$1',
            values: [id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/usuario/listar')
        })
    }


}

module.exports = new UsuarioController()