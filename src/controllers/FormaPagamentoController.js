const {render} = require('nunjucks')
const db = require('../db/connection')

class FormaPagamentoController {
    // LISTAR TODAS FORMAS DE PAGAMENTO
    index(req, res) {
        const query = 'SELECT * FROM forma_pagamento'
        db.query(query, (err, result) => {
            if (err) {
                console.log(`Houve um erro ao listar os usuários: ${err}`)
            }
            res.render('forma-pagamento/listar', {formasPagamento:result.rows})
        })
    }

    // CADASTRAR FORMAS DE PAGAMENTO
    // Apresentar tela para preencher cadastro
    create(req, res) {
        res.render('forma-pagamento/adicionar')
    }

    // Gravar novo cadastro
    store(req, res) {
        const dados = req.body
        const query = {
            text: 'INSERT INTO forma_pagamento (descricao) VALUES ($1)',
            values: [dados.descricao]
        }
        db.query(query, (err, result) => {
            if(err){
                console.log(`Houve um erro: ${err}`)
            }
            res.redirect('/forma-pagamento/listar')
        })

    }

    // EDITAR FORMA DE PAGAMENTO
    // Apresentar tela para edição com os campos preenchidos
    edit(req, res) {
        const dados = req.body
        const query = {
            text: 'SELECT * FROM forma_pagamento WHERE id=$1',
            values: [req.params.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao editar: ${err}`)
            }
            res.render('forma-pagamento/editar', {formaPagamento:result.rows[0]})
        })
    }

    // Gravar o cadastro editado
    update(req, res) {
        const dados = req.body
        const query = {
            text: 'UPDATE forma_pagamento SET descricao=$1 WHERE id=$2',
            values: [dados.descricao, dados.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
            res.redirect('/forma-pagamento/listar')
        })
    }

    // DELETAR FORMA DE PAGAMENTO
    delete(req, res) {
        const query = {
            text: 'DELETE FROM forma_pagamento WHERE id=$1',
            values: [req.params.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao excluir: ${err}`)
            }
            res.redirect('/forma-pagamento/listar')
        })
    }




}

module.exports = new FormaPagamentoController()