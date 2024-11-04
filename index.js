const express =  require('express')
const app = express()
const path = require('path')
let bodyParser = require('body-parser')

app.use( bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));


//configuração do ejs e dos caminhos das pastas
app.engine('html' , require('ejs').renderFile)
app.set('view engine' , 'ejs')
app.use('/public' , express.static(path.join(__dirname, 'public')))
app.set('views' , path.join(__dirname, '/src/pages'))

app.get('/' , (req, res ) => {
    console.log(req.query);

    if(req.query.busca == null){
        res.render('home' , {})
    }else{
        res.send('Você buscou ' + req.query.busca)
    }
})

app.get('/:slug' , (req , res) => {
    res.send(req.params.slug)
})

//criação do servidor
app.listen(3000 , () => {
    console.log('Servidor rodando');
    
})

