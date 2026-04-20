var database = require("../database/config");

function novoPost(idUser, desc, img) {
  let query = `insert post (descricao,img,idUsuario) VALUES( "${desc}",'',${idUser});`;
  return database.executar(query);
}

function buscarPost(filtro1,filtro2) {
    let where =''
    if(filtro1 != 'minutos'){
        filtro1 += ' desc'
    }
    if(filtro2.includes('curvatura')){
        where = `where usuario.curvatura = '${filtro2.substring(9)}'`
    }
  let query = `
    select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(idCurtida) as curtidas,count(idComentario) as comentarios ,count(idSeguimento) as seguidores
    from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  left join comentario on comentario.idPost = post.idPost left join seguir_usuario on usuario.idUsuario = idUsuarioSeguido 
    ${where}
    group by usuario.idUsuario, post.idPost order by ${filtro1};
    `;
  return database.executar(query);

}
module.exports = {
  novoPost,
  buscarPost,
};
