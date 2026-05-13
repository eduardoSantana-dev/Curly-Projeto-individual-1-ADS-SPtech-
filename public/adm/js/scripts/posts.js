async function buscarPosts() {
     
    let pesquisa = input_pesquisa.value != ''?input_pesquisa.value:0
    let ordem = select_ordem.value
    let categoria = select_tipo.value
    
    const posts = await reqGet(`/admin/buscarPosts/${ordem}/${categoria}/${pesquisa}`)
    listaPosts.innerHTML =''
    posts.data.forEach(post => {
        listaPosts.innerHTML +=`
          <div class="post">
                ${post.img_post? `
                    <div class="img">
                    <img src="../assets/imgPosts/${post.img_post}" alt="">
                </div>
                    `:''}
                <div class="infoPost">
                    <div class="perfil">
                    
                        <img src="../assets/userPerfil/${post.img}" alt="" >
                            
                            <div class="nomeArroba">
                                <span class="nomeUserPerfil">${post.nome}<span class="curvatura">${post.curvatura}</span></span>
                                <span class="usuarioUserPerfil">@${post.arroba}</span>
                            </div>
                    </div>
                    <p class="descPost">${post.desc}</p>
                    <div class="statusPost">
                         <div class="status">
                            <i class="fa-regular fa-thumbs-up"></i>
                            <span>${post.curtidas}</span>
                        </div>
                        <div class="status">
                            <i class="fa-regular fa-comment"></i>
                            <span>${post.comentarios}</span>
                        </div>
                        <div class="tipoPost"  ${post.categoria =='galeria'? 'style="background-color:var(--roxo)"':''}>${post.categoria}</div>
                    </div>
                </div>
                <div class="deletar" onclick ="deletar(${post.idPost})"><i class="fa-solid fa-xmark"></i></div>
           </div>
         `
    });
}
buscarPosts()
async function deletar(idPost) {
    const objeto = {
        idPost
    }
    const resposta = await reqPost('/admin/deletarPost',objeto)
    if(resposta){
        buscarPosts()
    }
}