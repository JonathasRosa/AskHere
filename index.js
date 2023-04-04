const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");
const perguntaModel = require("./database/Pergunta.js");

//Database
connection
    .authenticate()
    .then(( ) => {
    console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log("msgErro");
    })

//Utilizando o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//bodyParser é o cara responsável por traduzir os dados enviados pelo formulário em uma estrutura JS utilizável no backend.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

//ROTAS
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntas", (req, res) => {
    res.render("perguntas");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});

app.listen(8080, () => { console.log("App rodando!") });