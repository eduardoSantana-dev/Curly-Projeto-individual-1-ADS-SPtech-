var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
  let user = req.body;
  
  usuarioModel.cadastrar(
    user.nome,
    user.arroba,
    user.email,
    user.senha,
    user.data,
    user.curvatura,
    req.file.filename,
  );
}
async function verificarCadastro(req, res) {
    console.log(req.body)
    try{
        let resultado = await usuarioModel.verificarUnique(req.body.valor,req.body.tipo)
        let unico = false
        if(resultado[0].count ==0){
             unico= true
        }
        res.json({
                unico
            });
            
    }catch(error){
          res.status(400).send(error);
    }
    
  
}
module.exports = {
  cadastrar,
  verificarCadastro,
};
