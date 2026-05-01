
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
        seguidores: usuario[0].seguidores,
        seguindo: usuario[0].seguindo,
        usuario_segue:usuario[0].usuario_segue,
      })
    }catch(err){
      res.status(404).send(false)
    }
}
async function seguirUsuario(req,res) {
  console.log(req.body)
  try{
    const resposta = await usuarioModel.seguirUsuario(req.body.idUser,req.body.idPerfil)
    res.status(289).send(true);
  }catch(resposta){
      console.log(resposta)
      res.status(404).send(false)
  }
}
async function deixarDeSeguir(req,res) {
  console.log(req.body)
  try{
    const resposta = await usuarioModel.deixaDeSeguir(req.body.idUser,req.body.idPerfil)
    res.status(289).send(true);
  }catch(resposta){
      console.log(resposta)
      res.status(404).send(false)
  }
}
async function verificarSenha(req,res) {
  

  try{
    const resposta = await usuarioModel.verificarSenha(req.body.idUser,req.body.senha)
    console.log(resposta)
     res.status(202).json({
            sucess:true,
            data:resposta[0].user
        })
  }catch(resposta){
      console.log(resposta)
        res.status(402).json({
            sucess:false,
            data:resposta
        })
  }
}
async function atualizarUser(req,res) {
  const user = req.body
  let imgNome = "default";
  if (req.file) {
    imgNome = req.file.filename;
  }
  try{
    const resposta = await usuarioModel.atualizarUser(user.id,user.nome,user.arroba,user.email,user.senha,imgNome)
    console.log(resposta)
     res.status(202).json({
            sucess:true,
            data:resposta
        })
  }catch(resposta){
      console.log(resposta)
        res.status(402).json({
            sucess:false,
            data:resposta
        })
  }
}
module.exports = {
  cadastrar,
  login,
  verificarCadastro,
  buscarDados,
  seguirUsuario,
  deixarDeSeguir,
  verificarSenha,
  atualizarUser

};
