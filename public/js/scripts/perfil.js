const idPerfil = window.location.search.substring(4)
if(idPerfil == localUser.id){
  div_novoPostCardContainer.innerHTML = `<div id="novoPostCardContainer"></div>` 
}else{
  div_novoPostCardContainer.innerHTML = `<div id="novoPostCardContainer" style="display:none"></div>` 

}
async function buscarUser(){
   try{
     let usuario = await reqGet(`/usuarios/userDados/${idPerfil}`);
     console.log(usuario)
    nomeUserPerfil.innerHTML = usuario.nome
    usuarioUserPerfil.innerHTML = `@${usuario.arroba}`
    seguidores.innerHTML = `Seguidores: ${usuario.seguidores}`
    seguindo.innerHTML = `Seguindo: ${usuario.seguindo}`
    document.title = `Perfil de ${usuario.nome}`
    curvaturaUSerPerfil.innerHTML = usuario.curvatura
    imgUserPerfilPage.src = `/assets/userPerfil/${usuario.img}`
    if(usuario.usuario_segue){
      spanButtonSeguir.innerHTML = `<button class="botao button_seguir seguindo idButtonSeguir${idPerfil}" onclick="deixarDeSeguir(${idPerfil})" >Seguindo</button>`
    }else{
      spanButtonSeguir.innerHTML = `<button class="botao button_seguir  idButtonSeguir${idPerfil}" onclick="seguir(${idPerfil})" >Seguindo</button>`

    }
    buscarPostUSer(idPerfil)
   }catch(dados){
    console.log('dados')
   }
}
buscarUser()