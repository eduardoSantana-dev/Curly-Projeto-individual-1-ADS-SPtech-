const idPerfil = window.location.search.substring(4)

async function buscarUser(){
   try{
     let dados = await fetch(`/usuarios/userDados/${idPerfil}`)
    let usuario = await dados.json();
    nomeUserPerfil.innerHTML = usuario.nome
    usuarioUserPerfil.innerHTML = `@${usuario.arroba}`
    // seguidores.innerHTML = `Seguidores: ${usuario.seguidores}`
    // seguindo.innerHTML = `Seguindo: ${usuario.seguindo}`
    curvaturaUSerPerfil.innerHTML = usuario.curvatura
    imgUserPerfilPage.src = `/assets/userPerfil/${usuario.img}`
   }catch(dados){
    console.log('dados')
   }
}
buscarUser()