var postModel = require("../models/postModel");

async function postar(req,res) {
    let post = req.body;
    let imgNome = ''
    
     if(req.file){
         imgNome = req.file.filename
     }
     try{
         const resultado = await postModel.novoPost(post.idUser,post.desc,imgNome)
         res.status(202).send(true)
     }catch(err){
         console.log(err)
         res.status(404).send(false)
     }
}
async function buscarPost(req,res) {
    try{
        let params = req.params
        
        posts = await postModel.buscarPost(params.filtro1,params.filtro2,params.idEspectador)
        res.status(222).send(posts)
    }catch(posts){
        res.status(405).send(posts)
    }
}
async function curtir(req,res) {
    let dados = req.body;
     try{
         const resultado = await postModel.curtir(dados.idUser,dados.idPost)
         res.status(202).send(true)
     }catch(err){
         console.log(err)
         res.status(404).send(false)
     }
}
module.exports = {
    postar,
    buscarPost,
    curtir,
}