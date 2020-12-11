const db = require('../db/connection') // o ".." se refere a saída da pasta controllers para dps entrar na pasta db

class ClienteController{

    // LISTAR TODOS OS REGISTROS
    index(req, res){
        db.query('SELECT * FROM cliente',(err,result)=>{
            if(err){
              console.log(`Houve um erro ao listar os clientes: ${err}`)
            }
            res.render('cliente/listar',{clientes:result.rows})
          }) 
    }

    // CADASTRO DE CLIENTE
    // Apresenta o formulário para preencher cadastro
    create(req, res){
      res.render('cliente/adicionar')
    }

    // Grava o cadastro
    store(req, res){
      const query = {
          text:'INSERT INTO cliente(nome,cpf) VALUES ($1,$2)',
          values:[req.body.nome,req.body.cpf]
        }
        db.query(query,(err,result)=>{
          if(err){
            console.log(`Houve um erro: ${err}`)
          }
          res.redirect('/cliente/listar') // foi colocado aqui para redenrizar após inserção no BD. Se estivesse fora desse método, não iria apresentar a lista atualizada, pq o JS é assíncrono
        })              
    }

    edit(req, res){
      console.log(req.params.id)
      const query = {        
        text: 'SELECT * FROM cliente WHERE id=$1',
        values: [req.params.id] // por aqui tá pegando o parâmetro passado pela URL. Note que id veio do nome dado no método app.post desta rota.
      }
      db.query(query,(err,result) => {
        if(err) {
          console.log(`Houve um erro ao editar: ${err}`)
        }
        res.render('cliente/editar', {cliente:result.rows[0]}) //"o 0 do rows[0] refere-se ao índice zero do vetor"
      })       
    }

    update(req, res) {
      const dados = req.body
      const query = {
        text: 'UPDATE cliente SET nome=$1 , cpf=$2 WHERE id=$3',
        values: [dados.nome, dados.cpf, dados.id]
      }
      db.query(query, (err, result) => {
        if(err) {
          console.log(`Houve um erro ao atualizar o registro: ${err}`)
        }
        res.redirect('/cliente/listar')
      })
    }

    delete(req, res) {
      const id = req.params.id
      const query = {
        text:'DELETE FROM cliente WHERE id=$1',
        values: [id]
      }
      db.query(query,(err, result) => {
        if(err) {
          console.log(`Houve um erro ao excluir: ${err}`)
        }
        res.redirect('/cliente/listar')
      })
    }

}

module.exports = new ClienteController()