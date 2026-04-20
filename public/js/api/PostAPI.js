

async function postar() {
  let desc = desc_novoPost_input.value;
  let img = fotoNovoPost.files[0];
  const novoPost = new FormData();
  novoPost.append("desc", desc);
  novoPost.append("idUser", localUser.id);
  if (img != undefined) {
    novoPost.append("imgPost", img);
  }
  try{
   const postagem = await fetch("/posts/postar",{
        method: 'POST',
        body:novoPost
    })
    if(postagem){
        desc_novoPost_input.value = ''
        fotoNovoPost.files[0] = ''
        if(window.location == 'http://localhost:3333/' || window.location == 'http://localhost:3333/index.html'){
            buscarPost(ordemPost.value,filtroPost.value)
        }
    }else{
        alert("Erro ao realizar a postagem")
    }
  }catch(err){
    console.error("Erro ao inserir post" + err)
  }
}
async function buscarPost(ordem,filtro){
    var postSelect = [{}]
    console.log(ordem)
    try{
        postSelect = await fetch(`/posts/buscarPosts/${ordem}/${filtro}/${localUser.id}`)
        postsLista = await postSelect.json()
        console.log(postsLista)
         listarPost(postsLista, feedPost)
         if(filtroDePosts){
             ordemPost.value = ordem
            filtroPost.value = filtro
         }
    }catch(err){
        console.error(err)
        
    }
}

async function curtir(idPost,curtidas) {
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
    const resposta = await curtida.json()
    
    const idButton = document.getElementById(`buttonCurtir${idPost}`)
    if(resposta.mensagem == 'curtido'){
        idButton.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> <span>${curtidas+1}</span>`
         idButton.classList.add('buttonCurtircurtido')
   }else if(resposta.mensagem == 'descurtido'){
        idButton.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> <span>${curtidas}</span>`
         idButton.classList.remove('buttonCurtircurtido')
   }
  } catch (err) {
    console.log(err);
  }
}

