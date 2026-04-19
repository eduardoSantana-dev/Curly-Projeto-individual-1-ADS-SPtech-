var database = require("../database/config")

function cadastrar(nome,arroba,email,senha,dataNasc,curvatura,img){
    let query = `INSERT INTO usuario (nome,arroba,email,senha,dataNasc,curvatura,img) values ('${nome}','${arroba}','${email}','${senha}','${dataNasc}','${curvatura}','${img}');`
    database.executar(query)
    console.log("ok")
}

module.exports = {
    cadastrar
}