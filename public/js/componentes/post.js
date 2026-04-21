function formatarTempo(minutos) {
  let tempo = minutos;
  if (tempo >= 60) {
    tempo = parseInt(tempo / 60) + "h";
    if (tempo >= 24 && tempo < 48) {
      tempo = parseInt(tempo / 24) + "dia";
    } else if (tempo >= 48) {
      tempo = parseInt(tempo / 24) + "dias";
    }
  } else {
    tempo += "min";
  }
  return tempo;
}

function listarPost(posts, div) {
  div.innerHTML = "";
  posts.forEach((post) => {
    let imgPost = ``;
    let temIMG = false;

    if (post.img_post != "") {
      temIMG = true;
      imgPost = ` <img onclick="abrirPost(${post.idPost})" class="imgPost" src="assets/imgPosts/${post.img_post}" alt="" onclick="abrirPost(true)">`;
    }
    let bseguir = "";
    if (post.idUsuario != localUser.id) {
      bseguir = `<button class="botao button_seguir idButtonSeguir${post.idUsuario}" onclick="seguir(${post.idUsuario})">Seguir</button>`;
      if (post.seguindo == 1) {
        bseguir = `<button class="botao button_seguir seguindo idButtonSeguir${post.idUsuario}" onclick="deixarDeSeguir(${post.idUsuario})" >Seguindo</button> `;
      }
    }
    div.innerHTML += `
        <div class="post box">
                    <div class="OptionsPost">
                        <i></i>
                    </div>
                    <div class="perfilPost">
                        <div class="imgUserPostDiv">
                            <img src="assets/userPerfil/${post.img}" alt=""
                               />
                        </div>
                        <div class="nomeArroba">
                            <div class="infoPostUser">
                                <span class="nomeUserPost">${post.nome}</span>
                                <span class="curvatura c${post.curvatura[0]}">${post.curvatura}</span>
                                <span class="tempoPost">${formatarTempo(post.minutos)}</span>
                                ${bseguir}
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
                        <button onclick="curtir(${post.idPost},${post.curtidas})" class="buttonCurtir${post.idPost}"><i class="fa-regular fa-thumbs-up"></i> <span>${post.curtidas}</span></button>
                        <button  onclick="abrirPost(${post.idPost})"><i class="fa-regular fa-comment"></i>${post.comentarios}</button>
                    </div>

                </div>
        `;
  });
}

if (novoPostCardContainer) {
  novoPostCardContainer.innerHTML = `
       <div id="novoPostCard" class="box">
                    <div class="topoNovoPost">
                        <div class="imgUserNovoPost">
                            <img src="assets/userPerfil/${localUser.img}" alt=""
                               >
                        </div>
                        <input type="text" id="desc_novoPost_input" placeholder="Como estão seus cachos hoje?" >
                    </div>
                  <img src="" alt="" id="imgNovoPost">
                    <div class="complementosNovoPost">
                        <div class="complementos">
                            <label for="fotoNovoPost"><i class="fa-regular fa-image"></i> Foto</label>
                            <input type="file" id="fotoNovoPost" accept="image/*" onchange="mostrarPreview()">
                            <button class="ButtonProdutoNovoPost"><i class="fa-solid fa-pump-soap"></i>Produto</button>
                            <select name="" id="">
                                <option value="">Comum</option>
                                <option value="">Dica</option>
                                <option value="">Pergunta</option>
                            </select>
                        </div>
                        <button class="botao" type="button"  onclick = "postar()">Postar</button>
                    </div>
                </div>
    `;
}


function mostrarPreview(){
    if(fotoNovoPost.value !=''){
        imgNovoPost.src = URL.createObjectURL(fotoNovoPost.files[0])
        imgNovoPost.style = 'display:block'
    }
}
function verificarLinhas() {
  let campo = textarea_comentario;
  let tamanho = campo.value.length;
  let linhas = campo.rows;
  if (tamanho % 30 == 0) {
    campo.rows += 1;
  }
}


function exibirModalPost(post, comentarios,reload) {
  let bseguir = "";
  let img = post.img_post
  if (post.idUsuario != localUser.id) {
    bseguir = `<button class="botao button_seguir idButtonSeguir${post.idUsuario}" onclick="seguir(${post.idUsuario})">Seguir</button>`;
    if (post.seguindo == 1) {
      bseguir = `<button class="botao button_seguir seguindo idButtonSeguir${post.idUsuario}" onclick="deixarDeSeguir(${post.idUsuario})" >Seguindo</button> `;
    }
  }
  modalPostComfoto.innerHTML = `
     <i class="fa-solid fa-x" onclick="fecharModalPost()"></i>
        <div class="containerModalImg"  onclick="fecharModalPost()">
            <img src="assets/imgPosts/${post.img_post}" id="ImgcontainerModal" alt=""">
        </div>
        <div class="PostDetalhesmodal" id="PostDetalhesmodal">
            <div class="InfopostModal" >
                <div class="OptionsPost">
                    <i></i>
                </div>
                <div class="perfilPostModal">
                    <div class="imgUserPostDiv">
                        <img src="assets/userPerfil/${post.img}" alt="" />
                    </div>
                    <div class="nomeArroba">
                        <div class="infoPostUser">
                            <span class="nomeUserPost">${post.nome}</span>
                            <span class="curvatura c${post.curvatura[0]}">${post.curvatura}</span>
                            <span class="tempoPost">${formatarTempo(post.minutos)}</span>
                           ${bseguir}
                        </div>
                        <span class="usuarioUserPost">@edu.san07</span>
                    </div>
                </div>
                <div class="conteudoPost">
                    <div class="textoPost">
                        <p>${post.desc}</p>
                    </div>
                </div>
                <div class="statusPost">
                <button onclick="curtir(${post.idPost},${post.curtidas})" class="buttonCurtir${post.idPost}"><i class="fa-regular fa-thumbs-up"></i> <span>${post.curtidas}</span></button>
                </div>
            </div>
            <div class="ComentariosPostModal">
                <p>Comentarios(${post.comentarios})</p>
                <div class="novoComentario">
                    <div>
                        <img src="assets/userPerfil/${localUser.img}" alt="" />
                    </div>
                    <textarea name="" placeholder="Deixe um comentario" rows="2" id="textarea_comentario"
                        oninput="verificarLinhas()" onkeypress="comentar(event.key,${post.idPost})"></textarea>
                </div>
                <div class="listaComentarios" id="listaComentarios">
                    
                </div>
            </div>
        </div>
     `;
     listaComentarios.innerHTML = ''
     comentarios.forEach(c => {
       listaComentarios.innerHTML +=
        `
        <div class="comentario">
                        <div class="perfil">
                            <div class="imgUserPerfilDiv">
                                <img src="assets/userPerfil/${c.img}" alt="" id="imgUserPerfil">
                            </div>
                            <div class="nomeArroba">
                                <span id="nomeUserPerfil">${c.nome} <span class="usuarioTempo">${formatarTempo(c.minutos)}</span></span>
                                <span id="usuarioUserPerfil">@${c.arroba}</span>
                            </div>
                        </div>
                        <p class="textoComentario">${c.comentario}</p>
                    </div>

        `
       
       
     });
  if (img) {
    ImgcontainerModal.style = "display:block";
    modalPostComfoto.classList.add("ModalPostAtivo");
    modalPostComfoto.classList.remove("semFoto");
    document.querySelector("body").style = "overflow: hidden;";
  } else {
    ImgcontainerModal.style = "display:none";
    modalPostComfoto.classList.add("ModalPostAtivo");
    modalPostComfoto.classList.add("semFoto");
    document.querySelector("body").style = "overflow: hidden;";
  }
    if(!reload){
         PostDetalhesmodal.style = ' animation: ease-in-out infoPost 400ms;'
    }

}

function fecharModalPost() {
  modalPostComfoto.classList.remove("ModalPostAtivo");
  document.querySelector("body").style = "overflow: auto;";
}

document.querySelector("body").innerHTML += `
     <div class="modalPostComfoto semFoto " id="modalPostComfoto">
        
    </div>
    `;
