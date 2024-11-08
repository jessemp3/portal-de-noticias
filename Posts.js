var mongoose = require('mongoose')
var Schema = mongoose.Schema
 
var PostSchema = new Schema({
    titulo:String,
    imagem:String,
    categoria:String,
    conteudo: String,
    slug:String
} , {collection:'posts'})


var Posts = mongoose.model("Posts" , PostSchema);

module.exports = Posts