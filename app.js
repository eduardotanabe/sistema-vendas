const express = require('express')
const nunjucks = require('nunjucks')
const clienteController = require('./src/controllers/ClienteController')
const catergoriaProdutoController = require('./src/controllers/CategoriaProdutoController')
const categoriaProdutoController = require('./src/controllers/CategoriaProdutoController')
const usuarioController = require('./src/controllers/UsuarioController')

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

// ROTAS PARA CATEGORIA DOS PRODUTOS
app.get('/categoria-produto/listar', catergoriaProdutoController.index)

app.get('/categoria-produto/adicionar', catergoriaProdutoController.create)

app.post('/categoria-produto/salvar', categoriaProdutoController.store)

app.get('/categoria-produto/editar/:id', catergoriaProdutoController.edit)

app.post('/categoria-produto/atualizar', categoriaProdutoController.update)

app.get('/categoria-produto/excluir/:id', catergoriaProdutoController.delete)

//ROTAS PARA CLIENTES
app.get('/cliente/listar', clienteController.index) // como não é este método q irá invocar o método clienteController.index, não vai precisar colocar parênteses no último método

app.get('/cliente/adicionar', clienteController.create)

app.post('/cliente/salvar', clienteController.store)

app.get('/cliente/editar/:id', clienteController.edit) // Como na URL está enviando uma informação (no caso o id) pelo href do html, é preciso indicar para o express que depois do editar/ não é uma rota, para isso usa-se o ":" e dps um nome para esse parâmetro

app.post('/cliente/atualizar', clienteController.update)

app.get('/cliente/excluir/:id', clienteController.delete)

// ROTAS PARA CATEGORIA DOS PRODUTOS
app.get('/usuario/listar', usuarioController.index)

app.get('/usuario/adicionar', usuarioController.create)

app.post('/usuario/salvar', usuarioController.store)

app.get('/usuario/editar/:id', usuarioController.edit)

app.post('/usuario/atualizar', usuarioController.update)

app.get('/usuario/excluir/:id', usuarioController.delete)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})