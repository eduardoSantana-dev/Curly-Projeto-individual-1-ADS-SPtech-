
var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
  let user = req.body;
  let imgNome = "default";
  if (req.file) {
    imgNome = req.file.filename;
  }
  try {
    usuarioModel.cadastrar(
      user.nome,
      user.arroba,
      user.email,
      user.senha,
      user.data,
      user.curvatura,
      imgNome,
    );
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (err) {
    res.status(404).send(err);
    console.error(err);
  }
}
async function verificarCadastro(req, res) {
  try {
    let resultado = await usuarioModel.verificarUnique(
      req.body.valor,
      req.body.tipo,
    );
    let unico = false;
    if (resultado[0].count == 0) {
      unico = true;
    }
    res.json({
      unico,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function login(req, res) {
  const user = req.body;
  try {
    let usuario = await usuarioModel.login(user.email, user.senha);
    
     res.status(201).json({
        id: usuario[0].id,
        nome: usuario[0].nome,
        arroba: usuario[0].arroba,
        email: usuario[0].email,
        img: usuario[0].img,
        curvatura: usuario[0].curvatura,
     });
  } catch (err) {
    res.status(404).send(false);
  }
}
async function buscarDados(req, res) {
    const id = req.params.idUser
    try{
      let usuario = await usuarioModel.buscarDados(id);
      res.status(221).json({
        nome: usuario[0].nome,
        arroba: usuario[0].arroba,
        email: usuario[0].email,
        img: usuario[0].img,
        curvatura: usuario[0].curvatura,
      })
    }catch(err){
      res.status(404).send(false)
    }
}

module.exports = {
  cadastrar,
  login,
  verificarCadastro,
  buscarDados,
};
