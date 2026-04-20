function listarPost(posts, div) {
  posts.forEach((post) => {
    let imgPost = ``;
    let temIMG = false;
    if (post.img != "") {
      temIMG = true;
      imgPost = ` <img  class="imgPost" src="${post.img}" alt="" onclick="abrirPost(true)">`;
    }
    div.innerHTML += `
        <div class="post box">
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
                                <button class="botao button_seguir " style="background-color: var(--texto2);opacity:0.4">Seguindo</button>
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
                        <button  onclick="abrirPost(${temIMG})"><i class="fa-regular fa-comment"></i>${post.comentarios}</button>
                    </div>

                </div>
        `;
  });
  document.querySelector("body").innerHTML += `
     <div class="modalPostComfoto semFoto " id="modalPostComfoto">
        <i class="fa-solid fa-x" onclick="fecharModalPost()"></i>
        <div class="containerModalImg"  onclick="fecharModalPost()">
            <img src="https://i.pinimg.com/originals/34/57/95/3457953dc463079331708a11e0d6097b.jpg" id="ImgcontainerModal" alt=""">
        </div>
        <div class="PostDetalhesmodal">
            <div class="InfopostModal" >
                <div class="OptionsPost">
                    <i></i>
                </div>
                <div class="perfilPostModal">
                    <div class="imgUserPostDiv">
                        <img src="./assets/img/semImg.png" alt="" />
                    </div>
                    <div class="nomeArroba">
                        <div class="infoPostUser">
                            <span class="nomeUserPost">Edurdo Santana</span>
                            <span class="curvatura c3">3C</span>
                            <span class="tempoPost">20min</span>
                            <button class="botao button_seguir "
                                style="background-color: var(--texto2);opacity:0.4">Seguindo</button>
                        </div>
                        <span class="usuarioUserPost">@edu.san07</span>
                    </div>
                </div>
                <div class="conteudoPost">
                    <div class="textoPost">
                        <p>Vai tomando essa fotona do meu cabelo hoje familia</p>
                    </div>
                </div>
                <div class="statusPost">
                    <button><i class="fa-regular fa-thumbs-up"></i> <span>50</span></button>
                    <button><i class="fa-regular fa-comment"></i>40</button>
                </div>
            </div>
            <div class="ComentariosPostModal">
                <p>Comentarios</p>
                <div class="novoComentario">
                    <div>
                        <img src="./assets/img/semImg.png" alt="" />
                    </div>
                    <textarea name="" placeholder="Deixe um comentario" rows="2" id="textarea_comentario"
                        oninput="verificarLinhas()"></textarea>
                </div>
                <div class="listaComentarios">
                    <div class="comentario">
                        <div class="perfil">
                            <div class="imgUserPerfilDiv">
                                <img src="./assets/userPerfil/edu.jpeg" alt="" id="imgUserPerfil">
                            </div>
                            <div class="nomeArroba">
                                <span id="nomeUserPerfil">Eduardo Santana <span class="usuarioTempo">20 min</span></span>
                                <span id="usuarioUserPerfil">@edu.san07</span>
                            </div>
                        </div>
                        <p class="textoComentario">Vai tomando essa fotona do meu cabelo hoje familia</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;
}

if (novoPostCardContainer) {
  novoPostCardContainer.innerHTML = `
       <div id="novoPostCard" class="box">
                    <div class="topoNovoPost">
                        <div class="imgUserNovoPost">
                            <img src="assets/userPerfil/${localUser.img}" alt=""
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
    `;
}
function verificarLinhas() {
  let campo = textarea_comentario;
  let tamanho = campo.value.length;
  let linhas = campo.rows;
  if (tamanho % 30 == 0) {
    campo.rows += 1;
  }
}
function abrirPost(img) {
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
}
function fecharModalPost() {
  modalPostComfoto.classList.remove("ModalPostAtivo");
  document.querySelector("body").style = "overflow: auto;";
}
