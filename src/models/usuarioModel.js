var database = require("../database/config");

function cadastrar(nome, arroba, email, senha, dataNasc, curvatura, img) {
  if (img != "default") {
    img = `'${img}'`;
  }
  let query = `INSERT INTO usuario (nome,arroba,email,senha,dataNasc,curvatura,img) values ('${nome}','${arroba}','${email}','${senha}','${dataNasc}','${curvatura}',${img});`;
  return database.executar(query);
}
function verificarUnique(valor, tipo) {
  let query = `select count(idUsuario) as count from usuario where ${tipo} = '${valor}';`;
  return database.executar(query);
}
function login(email, senha) {
  let query = `select idUsuario as id,nome,arroba,img,curvatura,email from usuario where email = '${email}' and senha ='${senha}';`;
  return database.executar(query);
}
function buscarDados(id) {
  let query = `select u.*, count(distinct seguidores.idSeguimento) as seguidores, count(distinct seguindo.idSeguimento) as seguindo,
case when espectador.idUsuarioSeguidor IS NOT NULL then 1 else 0 end as usuario_segue
from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario  
left join seguir_usuario as seguindo on seguindo.idUsuarioSeguidor = u.idUsuario 
left join seguir_usuario espectador on u.idUsuario = espectador.idUsuarioSeguido and espectador.idUsuarioSeguidor = 101
where idUsuario = ${id};`;
  return database.executar(query);
}
function seguirUsuario(idUser, idSeguido) {
  let query = `insert into seguir_usuario(idUsuarioSeguido,idUsuarioSeguidor) values(${idSeguido},${idUser});`;
  return database.executar(query);
}
function deixaDeSeguir(idUser, idSeguido) {
  let query = `delete from seguir_usuario where idUsuarioSeguido =  ${idSeguido} and idUsuarioSeguidor = ${idUser};`;
  return database.executar(query);
}
function verificarSenha(id, senha) {
  let query = `select count(*) as user from usuario where senha = '${senha}' and idUsuario = ${id};`;
  return database.executar(query);
}
function atualizarUser(id, nome, arroba, email, senha, img) {
  console.log(senha);
  if (senha) {
    senha = `,senha = '${senha}'`;
  } else {
    senha = " ";
  }

  if (img && img != "default") {
    img = `,img = '${img}'`;
  } else {
    img = " ";
  }
  console.log(img);
  let query = `update usuario set nome = '${nome}',email ='${email}',arroba ='${arroba}' ${senha} ${img} where idUsuario = ${id};`;
  return database.executar(query);
}
function buscarPopulares() {
  let query = `select idUsuario,nome,arroba,img, count(distinct seguidores.idSeguimento) as seguidores
    from usuario as u left join seguir_usuario as seguidores on idUsuarioSeguido = u.idUsuario group by idUsuario order by seguidores desc limit 5;`;
    return database.executar(query)
}
function buscarSeguindo(id){
    let query = `select u.idUsuario,u.nome,u.arroba,u.img from usuario u join seguir_usuario on u.idUsuario = idUsuarioSeguido  join usuario s on idUsuarioSeguidor = s.idUsuario  where s.idUsuario = ${id};;`;
    return database.executar(query)
}
module.exports = {
  cadastrar,
  verificarUnique,
  login,
  buscarDados,
  seguirUsuario,
  deixaDeSeguir,
  verificarSenha,
  atualizarUser,
  buscarPopulares,
  buscarSeguindo
};
