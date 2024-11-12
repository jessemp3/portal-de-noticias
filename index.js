const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
let bodyParser = require("body-parser");

const Posts = require("./Posts.js");

//connet with mongo atlas
mongoose
  .connect(
    "mongodb+srv://root:mrjesse12@cluster0.z6f9b.mongodb.net/Aula_node?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conectado com sucesso");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//configuração do ejs e dos caminhos das pastas
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src/pages"));

app.get("/", async (req, res) => {
  console.log(req.query);

  if (req.query.busca == null) {
    //pagandos os id
    Posts.find({})
      .sort({ _id: -1 })
      .exec(function (err, posts) {
        console.log(posts);
        posts = posts.map(function (val) {
          return {
            titulo: val.titulo,
            conteudo: val.conteudo,
            descricaoCurta: val.conteudo.substr(0, 100),
            imagem: val.imagem,
            slug: val.slug,
            categoria: val.categoria,
          };
        });

        //pegando as views
        Posts.find({})
          .sort({ views: -1 })
          .limit(3)
          .exec(function (err, postsTop) {
            // console.log(posts[0]);

            postsTop = postsTop.map(function (val) {
              return {
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substr(0, 100),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria,
                views: val.views,
              };
            });

            res.render("index", { posts: posts, postsTop: postsTop });
          });
      });
  } else {
    Posts.find(
      { titulo: { $regex: req.query.busca, $options: "i" } },
      (err, posts) => {
        console.log(posts);
        posts = posts.map(function (val) {
          return {
            titulo: val.titulo,
            conteudo: val.conteudo,
            descricaoCurta: val.conteudo.substr(0, 100),
            imagem: val.imagem,
            slug: val.slug,
            categoria: val.categoria,
            views: val.views,
          };
        });
        res.render("busca", { posts: posts, contagem: posts.length });
      }
    );
  }
});

app.get("/:slug", (req, res) => {
  //   console.log(req.params.slug);
  Posts.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true },
    function (err, resposta) {
      console.log(resposta);
      if (resposta != null) {
        Posts.find({})
          .sort({ views: -1 })
          .limit(3)
          .exec(function (err, postsTop) {
            // console.log(posts[0]);

            postsTop = postsTop.map(function (val) {
              return {
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substr(0, 100),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria,
                views: val.views,
              };
            });

            res.render("single", { noticia: resposta, postsTop: postsTop });
          });
      } else {
        res.status(404).render("erro");
      }
    }
  );
});

app.get("/debug/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});
//criação do servidor
app.listen(4000, () => {
  console.log("Servidor rodando");
});
