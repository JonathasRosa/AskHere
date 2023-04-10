const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '01501309374JRosa'
const Pergunta = require("./database/Pergunta.js");
const Resposta = require("./database/Resposta.js");
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
    Pergunta.findAll({
        raw: true, order: [
        "id","DESC"//ASC = crescente || DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    })
});

app.get("/perguntas", (req, res) => {
    res.render("perguntas");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        tiluto: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {//Pergunta encontrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ["id", "DESC"]
                ]
            }).then(respostas => {
                res.render("pergunta.ejs", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {//Pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    })
});
app.listen(8080, () => { console.log("App rodando!") });