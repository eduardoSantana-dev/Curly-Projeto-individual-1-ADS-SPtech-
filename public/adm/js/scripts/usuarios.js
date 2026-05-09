async function buscarUsuarios() {
    let status = filtroSelect.value
    let ordem = ordemSelect.value
    let pesquisa = pesquisa_input.value
    if(pesquisa =='')pesquisa = 'Sem pesquisa Feita'
    const dados = await reqGet(`/admin/buscarUsuarios/${status}/${ordem}/${pesquisa}`);
    listaUsers.innerHTML =''
    dados.data.forEach(usuario => {
         listaUsers.innerHTML +=`
         <div class="user ${usuario.statusUsuario == 'desativado'?'userDesativado':''}">
               <div class="imgNomeArroba">
                 <img src="../assets/userPerfil/${usuario.img}" alt="">
                <div class="nomeArroba">
                    <span class="nome">${usuario.nome}<span class="curvatura">${usuario.curvatura}</span></span>
                    <span class="arroba">@${usuario.arroba}</span>
                </div>
               </div>
                <span class="email">
                    ${usuario.email}
                </span>
                <span class="status">${usuario.statusUsuario}</span>
                <i class="${usuario.statusUsuario =='ativo'?'fa-solid fa-xmark':'fa-solid fa-arrow-rotate-left'}" onclick="desativarOuAtivarUser(${usuario.idUsuario})"></i>
                
            </div>
        `
    });
}
async function desativarOuAtivarUser(idUser) {
    let user ={
        idUser
    }
    const resposta = await reqPost('/admin/desativarOuAtivarUser',user)

    if(resposta.sucesso){
        buscarUsuarios()
    }
}
buscarUsuarios()

