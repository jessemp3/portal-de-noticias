const express =  require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
let bodyParser = require('body-parser')


//connet with mongo atlas
mongoose.connect('mongodb+srv://root:mrjesse12@cluster0.z6f9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Conectado com sucesso");
}).catch((err) => {
    console.log(err.message);
    
})


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
        res.render('busca' , {})
    }
})

app.get('/:slug' , (req , res) => {
    // res.send(req.params.slug)
    res.render('single' , {})
})

//criação do servidor
app.listen(4000 , () => {
    console.log('Servidor rodando');

})

