var admModel = require("../models/admModel");

async function logar(req, res) {
   const user = req.body
    try{
        const resultado = await admModel.logar(user.email,user.senha)
        res.status(202).json({
          sucesso: true,
          data: resultado,
        });
    }catch(resultado){
        res.status(402).json({
          sucesso: false,
          data: resultado,
        });
    }
}
async function dadosDash(req,res) {
  try{
              const kpisGraficosRosca = await admModel.kpisGraficosRosca()
        const graficoUsuario = await admModel.graficoUsuario()
        const populares = await admModel.populares()
        const ultimosCadastros = await admModel.ultimosCadastros()
        res.status(202).json({
          sucesso: true,
          data: {kpisGraficosRosca,graficoUsuario,populares,ultimosCadastros}
        });
    }catch(resultado){
        res.status(402).json({
          sucesso: false,
          data: resultado,
        });
    }
}
async function buscarUsuarios(req,res) {
    try{
        let params = req.params
      
        const usuarios = await admModel.buscarUsuarios(params.pesquisa,params.status,params.ordem)
         res.status(202).json({
          sucesso: true,
          data: usuarios,
        });
    }catch(usuarios){
         res.status(402).json({
          sucesso: false,
          data:usuarios,
        });
    }
}
async function desativarOuAtivarUser(req, res) {
   const idUser = req.body.idUser
   
    try{
        const resultado = await admModel.desativarOuAtivarUser(idUser)
        res.status(202).json({
          sucesso: true,
        });
    }catch(resultado){
        res.status(402).json({
          sucesso: false,
          data:resultado
        });
    }
}
module.exports = {
  logar,
  dadosDash,
  buscarUsuarios,
  desativarOuAtivarUser
};
