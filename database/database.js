const Sequelize = require("sequelize");
const connection = new Sequelize("guiaperguntas", "root", "01501309374JRosa", {
    host: "localhost",
    dialect: "mysql"
});
module.exports = connection;