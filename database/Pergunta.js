//DEFINIÇÃO DO MÓDULO
const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("perguntas", {//Defnição dos campus da tabela.
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});
//Aqui passo a informação para a tabela ser criada.
Pergunta.sync({ force: false }).then(() => {
    console.log("Tabela criada!")
});

module.exports = Pergunta; 