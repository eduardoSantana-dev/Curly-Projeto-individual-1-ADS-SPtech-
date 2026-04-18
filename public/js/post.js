function listarPost (posts,div){
    posts.forEach(post => {
        let imgPost = ``
        if(post.img != ""){
            imgPost = ` <img  class="imgPost" src="${post.img}" alt="">`
        }
       div.innerHTML += `
        <div class="post">
                    <div class="OptionsPost">
                        <i></i>
                    </div>
                    <div class="perfilPost">
                        <div class="imgUserPostDiv">
                            <img src="${post.usuario_img}" alt=""
                               />
                        </div>
                        <div class="nomeArroba">
                            <div class="infoPostUser">
                                <span class="nomeUserPost">${post.usuario_nome}</span>
                                <span class="curvatura c${post.curvatura[0]}">${post.curvatura}</span>
                                <span class="tempoPost">${post.tempo}</span>
                            </div>
                            <span class="usuarioUserPost">@${post.arroba}</span>
                        </div>
                    </div>
                    <div class="conteudoPost">
                        <div class="textoPost">
                        
                            <p>${post.desc}</p>
                        </div>
                       ${imgPost}
                    </div>
                    <div class="statusPost">
                        <button><i class="fa-regular fa-thumbs-up"></i> <span>${post.curtidas}</span></button>
                        <button><i class="fa-regular fa-comment"></i>${post.comentarios}</button>
                    </div>

                </div>
        `
    });
}

if(novoPostCardContainer){
    novoPostCardContainer.innerHTML = `
       <div id="novoPostCard">
                    <div class="topoNovoPost">
                        <div class="imgUserNovoPost">
                            <img src="https://i.pinimg.com/736x/f9/46/92/f94692772d5300dd8964e048b02adcaa.jpg" alt=""
                                id="imgNovoPost">
                        </div>
                        <input type="text" placeholder="Como estão seus cachos hoje?">
                    </div>
                    <div class="complementosNovoPost">
                        <div class="complementos">
                            <label for="fotoNovoPost"><i class="fa-regular fa-image"></i> Foto</label>
                            <input type="file" id="fotoNovoPost">
                            <button class="ButtonProdutoNovoPost"><i class="fa-solid fa-pump-soap"></i> Produto</button>
                            <select name="" id="">
                                <option value="">Comum</option>
                                <option value="">Dica</option>
                                <option value="">Pergunta</option>
                            </select>
                        </div>
                        <button class="botao">Postar</button>
                    </div>
                </div>
    `
}