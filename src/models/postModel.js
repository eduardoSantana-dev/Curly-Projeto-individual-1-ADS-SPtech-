var database = require("../database/config");

function novoPost(idUser, desc, img) {
  let query = `insert post (descricao,img,idUsuario) VALUES( '${desc}','${img}',${idUser});`;
  return database.executar(query);
}

function buscarPost(filtro1,filtro2,idEspectador) {
    let where =''
    if(filtro1 != 'minutos'){
        filtro1 += ' desc'
    }else{
      filtro1 = 'dataPost desc'
    }
    if(filtro2.includes('curvatura')){
        where = `where usuario.curvatura = '${filtro2.substring(9)}'`
    }
    if(filtro2 == 'seguindo'){
      where = 'where espectador.idUsuarioSeguidor IS NOT NULL'
    }

  let query = `
   select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(idCurtida) as curtidas,count(idComentario) as comentarios ,count(DISTINCT postador.idUsuarioSeguidor) as seguidores,case when espectador.idUsuarioSeguidor IS NOT NULL then 1 else 0 end as seguindo
    from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  left join comentario on comentario.idPost = post.idPost left join seguir_usuario as postador on usuario.idUsuario = idUsuarioSeguido
    left join seguir_usuario espectador on usuario.idUsuario = espectador.idUsuarioSeguido and espectador.idUsuarioSeguidor = ${idEspectador}
    ${where}
    group by usuario.idUsuario, post.idPost order by ${filtro1}
    `;
  return database.executar(query);

}

async function curtir(idUser,idPost){
  let where = `where idPost = ${idPost} and idUsuario = ${idUser}`
  let jaSegue = await database.executar(`select count(idCurtida) as res from curtida ${where};`)
  let query
  let resposta =''
  if(jaSegue[0].res == 0){
    query = `insert curtida (idUsuario,idPost) VALUES('${idUser}',${idPost});`;
    resposta = 'curtido'
  }else{
    query = `delete from curtida ${where};`;
    resposta = 'descurtido'
  }
  database.executar(query)
  return resposta;
}
module.exports = {
  novoPost,
  buscarPost,
  curtir,
};
