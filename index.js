const express =  require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
let bodyParser = require('body-parser')


const Posts = require('./Posts.js')



//connet with mongo atlas
mongoose.connect('mongodb+srv://root:mrjesse12@cluster0.z6f9b.mongodb.net/Aula_node?retryWrites=true&w=majority&appName=Cluster0').then(() => {
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

app.get('/' , async  (req, res ) => {
    console.log(req.query);

    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).exec(function(err, posts){
        console.log(posts[0]);
            posts = posts.map(function(val){
                return{
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0,100),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria
                }
            })
         res.render('home' ,{posts:posts})
      })
    }else{
        res.render('busca' , {})
    }
})

app.get('/:slug' , (req , res) => {
    // res.send(req.params.slug)

    Posts.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { view: 1 } },
        { new: true },
        (err, resposta) => {
            if (err) {
                console.error(err);
                return res.status(500).render('error', { message: 'An error occurred' });
            }
            if (!resposta) {
                return res.status(404).render('error', { message: 'Post not found' });
            }
            res.render('single', { post: resposta });
        }
    );
})

//criação do servidor
app.listen(4000 , () => {
    console.log('Servidor rodando');

})

