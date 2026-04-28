async function postar() {
  let desc = desc_novoPost_input.value;
  let img = fotoNovoPost.files[0];
  const novoPost = new FormData();
  novoPost.append("desc", desc);
  novoPost.append("idUser", localUser.id);
  if (img != undefined) {
    novoPost.append("imgPost", img);
  }
  try {
    const postagem = await fetch("/posts/postar", {
      method: "POST",
      body: novoPost,
    });
    if (postagem) {
      desc_novoPost_input.value = "";
      fotoNovoPost.files[0] = "";
       imgNovoPost.src ='';
       imgNovoPost.style = 'display:none'
      if (
        window.location == "http://localhost:3333/" ||
        window.location == "http://localhost:3333/index.html"
      ) {
        buscarPost(ordemPost.value, filtroPost.value);
      }
    } else {
      alert("Erro ao realizar a postagem");
    }
  } catch (err) {
    console.error("Erro ao inserir post" + err);
  }
}
async function buscarPost(ordem, filtro) {
  var postSelect = [{}];

  feedPost.innerHTML =`<img src="assets/loading.gif" class="loading" alt="">`
   if (filtroDePosts) {
      ordemPost.value = ordem;
      filtroPost.value = filtro;
    }
  if(filtro == 'curvatura'){
    filtro += localUser.curvatura
  }
  try {
    postSelect = await fetch(
      `/posts/buscarPosts/${ordem}/${filtro}/${localUser.id}`,
    );
    postsLista = await postSelect.json();
    listarPost(postsLista, feedPost);
   
  } catch (err) {
    console.error(err);
  }
}
async function buscarPostUSer(idUser) {
  var postSelect = [{}];
  try {
    postSelect = await fetch(
      `/posts/buscarPostsUser/${idUser}/${localUser.id}`,
    );
    postsLista = await postSelect.json();
    console.log(postsLista);
    listarPost(postsLista, postsDoPerfil);
   
  } catch (err) {
    console.error(err);
  }
}

async function curtir(idPost, curtidas) {
  try {
    const curtida = await fetch("/posts/curtir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: localUser.id,
        idPost,
      }),
    });
    const resposta = await curtida.json();

    const idButtons = document.querySelectorAll(`.buttonCurtir${idPost}`);
    idButtons.forEach((button) => {
      if (resposta.mensagem == "curtido") {
        button.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> <span>${curtidas + 1}</span>`;
        button.classList.add("buttonCurtircurtido");
        button.onclick = () => curtir(idPost,curtidas+1)
      } else if (resposta.mensagem == "descurtido") {
        button.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> <span>${curtidas-1}</span>`;
        button.classList.remove("buttonCurtircurtido");
        button.onclick = () => curtir(idPost,curtidas-1)

      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function abrirPost(idPost,reload) {
  try {
    const resposta = await fetch(
      `/posts/buscarComentarios/${idPost}/${localUser.id}`,
    );
    const dados = await resposta.json();
    const postInfo = dados.post[0];
    const comentarios = dados.comentarios;
    exibirModalPost(postInfo, comentarios,reload);
  } catch (dados) {
    console.error(dados);
  }
}
async function comentar(tecla,idPost) {
  if(tecla === "Enter"){
    let desc = textarea_comentario.value;
    try {
      const comentario = await fetch("/posts/comentar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: localUser.id,
          idPost,
          desc
        }),
      });
      if (comentario) {
       abrirPost(idPost,true)
      } else {
        alert("Erro ao realizar a postagem");
      }
    } catch (err) {
      console.error("Erro ao inserir post" + err);
    }
  }
}



