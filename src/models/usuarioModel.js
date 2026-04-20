var database = require("../database/config")

function cadastrar(nome,arroba,email,senha,dataNasc,curvatura,img){
    if (img != 'default'){
        img = `'${img}'`
    }
    let query = `INSERT INTO usuario (nome,arroba,email,senha,dataNasc,curvatura,img) values ('${nome}','${arroba}','${email}','${senha}','${dataNasc}','${curvatura}',${img});`
    return database.executar(query)
}
function verificarUnique(valor,tipo){
    let query = `select count(idUsuario) as count from usuario where ${tipo} = '${valor}';`
    return database.executar(query)
}
function login(email,senha){
    
    let query = `select idUsuario as id,nome,arroba,img,curvatura from usuario where email = '${email}' and senha ='${senha}';`
    return database.executar(query)
}
function buscarDados(id){
    let query = `select * from usuario where idUsuario = ${id};`
    return database.executar(query)
}
module.exports = {
    cadastrar,
    verificarUnique,
    login,
    buscarDados,
}