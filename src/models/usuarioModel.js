var database = require("../database/config")

function cadastrar(nome,arroba,email,senha,dataNasc,curvatura){
    let query = `INSERT INTO usuario (nome,arroba,email,senha,dataNasc,curvatura) values ('${nome}','${arroba}','${email}','${senha}','${dataNasc}','${curvatura}');`
    database.executar(query)
    console.log("ok")
}

module.exports = {
    cadastrar
}