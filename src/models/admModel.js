var database = require("../database/config");

function logar(email, senha) {
  const query = ` select * from adm where email = '${email}' and senha ='${senha}';`;
  return database.executar(query);
}
function kpisGraficosRosca() {
  const query = `
    select
    (select count(*) from usuario where statusUsuario = 'ativo') as usuarios ,

    (select count(*) from post) postagens,

    (select count(*) from usuario where curvatura like "2%" and statusUsuario = 'ativo') as usuarios_ondulado,
    (select count(*) from usuario where curvatura like "3%" and statusUsuario = 'ativo') as usuarios_cacheado,
    (select count(*) from usuario where curvatura like "4%" and statusUsuario = 'ativo') as usuarios_crespo,

    (select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "2%" and statusUsuario = 'ativo') as posts_ondulado,
    (select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "3%" and statusUsuario = 'ativo') as posts_cacheado,
    (select count(*) from usuario u join post p on p.idUsuario = u.idUsuario where curvatura like "4%" and statusUsuario = 'ativo') as posts_crespo
    `;
  return database.executar(query);
}
function graficoUsuario() {
  const query = `select count(*) usuarios, date(dataRegistro) as dia from usuario group by dia;`;
  return database.executar(query);
}
function populares() {
  const query = `select idUsuario,nome,arroba,img, count(distinct seguidores.idSeguimento) as seguidores
    from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario where statusUsuario = 'ativo'
    group by idUsuario order by seguidores desc limit 3;`;
  return database.executar(query);
}
function ultimosCadastros() {
  const query = `select nome,arroba,img from usuario order by dataRegistro desc limit 3; `;
  return database.executar(query);
}
function buscarUsuarios(pesquisa, status, ordem) {
  let whereStatus = false;
  let likePesquisa = false;
  let where = "";
  if (status != "todos") {
    whereStatus = `statusUsuario = '${status}'`;
  }
  if (pesquisa != "undefined" && pesquisa != "Sem pesquisa Feita") {
    likePesquisa = `(nome like '%${pesquisa}%' or arroba like '%${pesquisa}%')`;
  }
  if (whereStatus && likePesquisa) {
    where = `where ${whereStatus} and ${likePesquisa}`;
  } else {
    if (whereStatus) {
      where = `where ${whereStatus}`;
    } else if (likePesquisa) {
      likePesquisa = `where ${likePesquisa}`;
    }
  }
  const query = `
  select u.*,count(distinct seguidores.idSeguimento) as seguidores 
  from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario
  ${where}
  group by idUsuario order by ${ordem} desc ;`;

  return database.executar(query);
}
async function desativarOuAtivarUser(idUser) {
  let busca = await database.executar(
    `select statusUsuario as status from usuario where idUsuario =${idUser};`,
  );
  let statusAtual = busca[0].status;
  let query = `update usuario set statusUsuario = ${statusAtual == "ativo" ? "'desativado'" : "'ativo'"} where idUsuario =${idUser};`;
  return database.executar(query);
}
async function buscarPosts(ordem, pesquisa, categoria) {
  let whereOrdem = "minutos asc";
  let likePesquisa = "";
  let whereCategoria = "";
  if (categoria != "todos") {
    whereCategoria = `and categoria ='${categoria}'`;
  }
  if (ordem == "seguidores") {
    whereOrdem = "seguidores desc";
  }
  if (pesquisa != "0") {
    likePesquisa = `and ( descricao like '%${pesquisa}%' or usuario.nome like '%${pesquisa}%' or usuario.arroba like '%${pesquisa}%')`;
  }
  let query = `
    select usuario.*,post.idPost,descricao as 'desc', post.img as 'img_post', TIMESTAMPDIFF(minute,dataPost,now()) as 'minutos',count(DISTINCT curtida.idCurtida) as curtidas,count(DISTINCT idComentario) as comentarios
    ,count(DISTINCT postador.idUsuarioSeguidor) as seguidores, categoria
    from post join usuario on post.idUsuario = usuario.idUsuario left join curtida on post.idPost = curtida.idPost  
    left join comentario on comentario.idPost = post.idPost left join seguir_usuario as postador on usuario.idUsuario = idUsuarioSeguido
    where statusUsuario = 'ativo' ${whereCategoria}  ${likePesquisa}
    group by usuario.idUsuario, post.idPost order by ${whereOrdem};
  `;
  return database.executar(query);
}
async function deletarPost(idPost) {
  const deletarCurtidas = `delete from curtida where idPost = ${idPost};`
  const deletarComentarios = `delete from comentario where idPost = ${idPost};`
  const deletarPost = `delete from post where idPost = ${idPost};`
  database.executar(deletarCurtidas)
  database.executar(deletarComentarios)
  
  return database.executar(deletarPost)
  return;
}
module.exports = {
  logar,
  kpisGraficosRosca,
  graficoUsuario,
  populares,
  ultimosCadastros,
  buscarUsuarios,
  desativarOuAtivarUser,
  buscarPosts,
  deletarPost,
};
