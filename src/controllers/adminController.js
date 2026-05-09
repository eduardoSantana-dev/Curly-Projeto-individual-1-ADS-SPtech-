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

module.exports = {
  logar,
};
