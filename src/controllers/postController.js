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
         console.log(resultado)
         res.status(202).json({
            sucesso: true,
            mensagem: resultado
     })
        
     }catch(err){
         console.log(err)
         res.status(404).send(false)
     }
}
async function buscarComentarios(req,res){
    const idPost = req.params.idPost
    const idEspectador = req.params.idEspectador
    try{
        const comentarios = await postModel.buscarComentarios(idPost)
        const post = await postModel.buscarPostUnico(idPost,idEspectador)
        res.status(202).json({
            sucesso:true,
            post,
            comentarios
        })
    }
     catch(res){
         console.log(res)
         res.status(404).send(false)
     }
    
}
async function comentar(req,res){
    const idPost = req.body.idPost
    const idUser = req.body.idUser
    const desc = req.body.desc
    try{
        const insert = await postModel.novoComentario(idPost,idUser,desc)
        res.status(202).send(true)
    }
     catch(res){
         console.log(res)
         res.status(404).send(false)
     }
    
}
module.exports = {
    postar,
    buscarPost,
    curtir,
    buscarComentarios,
    comentar,
}