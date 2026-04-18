var usuarioModel = require("../models/usuarioModel");

function cadastrar(req,res){
    let user = req.body
    usuarioModel.cadastrar(
        user.nome,
        user.arroba,
        user.email,
        user.senha,
        user.data,
        user.curvatura
    )

}

module.exports = {
    cadastrar
}