const idPerfil = window.location.search.substring(4)
if(idPerfil == localUser.id){
  div_novoPostCardContainer.innerHTML = `<div id="novoPostCardContainer"></div>` 
}
async function buscarUser(){
   try{
     let dados = await fetch(`/usuarios/userDados/${idPerfil}`)
     let usuario = await dados.json();
     nomeUserPerfil.innerHTML = usuario.nome
     usuarioUserPerfil.innerHTML = `@${usuario.arroba}`
     buscarPostUSer(idPerfil)
     // seguidores.innerHTML = `Seguidores: ${usuario.seguidores}`
    // seguindo.innerHTML = `Seguindo: ${usuario.seguindo}`
    document.title = `Perfil de ${usuario.nome}`
    curvaturaUSerPerfil.innerHTML = usuario.curvatura
    imgUserPerfilPage.src = `/assets/userPerfil/${usuario.img}`
   }catch(dados){
    console.log('dados')
   }
}
buscarUser()