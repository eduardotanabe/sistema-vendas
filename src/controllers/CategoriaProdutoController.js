const { render } = require('nunjucks')
const db = require('../db/connection')

class CategoriaProdutoController {
    // LISTAR TODOS DA CATEGORIA PRODUTO
    index(req, res) {
        db.query('SELECT * FROM categoria_produto', (err, result) => {
            if (err) {
                console.log(`Houve um erro ao listar as categorias dos produtos: ${err}`)
            }
            res.render('categoria-produto/listar', {categorias:result.rows})
        })
    }

    // CADASTRO DE CATEGORIAS 
    // Apresenta o formulário para preencher cadastro
    create(req, res) {
        res.render('categoria-produto/adicionar')
    }

    // Grava o cadastro
    store(req, res) {
        const query = {
            text: 'INSERT INTO categoria_produto (descricao) VALUES ($1)',
            values: [req.body.descricao]
        }
        db.query(query, (err, result) => {
            if(err){
                console.log(`Houve um erro: ${err}`)
            }
            res.redirect('/categoria-produto/listar')
        })
    }

    edit(req, res) {
        console.log(req.params.id)
        const query = {
            text: 'SELECT * FROM categoria_produto WHERE id=$1',
            values: [req.params.id]
        }
        db.query(query, (err, result) => {
        if(err) {
            console.log(`Houve um erro ao editar: ${err}`)
        }          
        res.render('categoria-produto/editar', {categoria:result.rows[0]})
        })
    }

    update(req, res) {
        const query = {
            text: 'UPDATE categoria_produto SET descricao=$1 WHERE id=$2',
            values: [req.body.descricao, req.body.id]
        }
        db.query(query, (err, result) => {
            if(err) {
                console.log(`Houve um erro ao atualizar o registro: ${err}`)
            }
            res.redirect('/categoria-produto/listar')

        })
    }

    delete(req, res) {
        console.log(req.params.id)
        const id = req.params.id
        const query = {
            text: 'DELETE FROM categoria_produto WHERE id=$1',
            values: [id]
        }
        db.query(query,(err, result) => {
            if(err) {
              console.log(`Houve um erro ao excluir: ${err}`)
            }
        res.redirect('/categoria-produto/listar')
        })
    }

}

module.exports = new CategoriaProdutoController()