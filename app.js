const express = require('express')
const nunjucks = require('nunjucks')


const app = express()
const port = 3000
app.use(express.static('public')) // se não colocar este comando, os arquivos estáticos não serão reconhecidos quando abrir uma página que necessite desses arquivos
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
  let {clientes} = require('./src/db/fakeData')
  res.render('cliente/listar', {clientes:clientes})
})
app.get('/cliente/adicionar',(req,res)=>{
  res.render('cliente/adicionar')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})