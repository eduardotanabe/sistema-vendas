const {response} = require('express')
const express = require('express')
const nunjucks = require('nunjucks')
const {db} = require('./src/db/connection')

/*db.query('SELECT * FROM cliente',(err,result)=>{
  if(err) {
    console.log(`Houve um erro ao conectar: ${err}`)
  }
  console.table(result.rows)
})*/


const app = express()
const port = 3000
app.use(express.static('public')) // se não colocar este comando, os arquivos estáticos não serão reconhecidos quando abrir uma página que necessite desses arquivos
app.use(express.urlencoded({extended:true})) // essa função faz com que o quando insere algo no form, ele fica em um formato que possa ser utilizaddo posteriormente. Foi muito importante  
app.set('view engine','.html') // aqui está falando que tipo de extensão o view engine está usando. Além disso, não precisará colocar a extensão html quando chamar documentos desse tipo

nunjucks.configure('./src/views', { // aqui tá indicando que o as views estão nesse caminho
  autoescape: true, // esse evita injeção de script nos comandos, os famosos injections utilzados de forma maliciosa
  express: app
});



// ROTAS
app.get('/',(req,res)=>{ 
  res.render('index')
})

// ROTAS PARA PRODUTOS
app.get('/categoria-produto/listar',(req,res)=>{
  let {categoriasDeProduto} = require('./src/db/fakeData')
  res.render('categoria-produto/listar',{categorias:categoriasDeProduto})
})
app.get('/categoria-produto/adicionar',(req,res)=>{
  res.render('categoria-produto/adicionar')
})

//ROTAS PARA CLIENTES
app.get('/cliente/listar', (req,res)=>{
  db.query('SELECT * FROM cliente', (err, result)=>{
    if(err){
      console.log(`Houve um erroao listar os clientes: ${err}`)
    }
    res.render('cliente/listar', {clientes:result.rows})
  })  
})
app.get('/cliente/adicionar',(req,res)=>{
  res.render('cliente/adicionar')
})

app.post('/cliente/salvar', (req,res)=>{
  const query = {
  text:'INSERT INTO cliente(nome,cpf) VALUES ($1,$2)',
  values:[req.body.nome,req.body.cpf]
  }
  db.query(query,(err,result)=>{
    if(err){
      console.log(`Houve um erro: ${err}`)
    }
    console.log(result)
  }) 

  res.redirect('/cliente/listar')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})