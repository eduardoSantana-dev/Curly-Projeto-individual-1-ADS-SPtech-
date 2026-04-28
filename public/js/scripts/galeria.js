async function chamarGaleria(filtro,ordem) {
  const posts = await reqGet(`posts/galeria/${filtro}/${ordem}`)
  console.log(posts)
  posts.data.forEach(post => {
    listaImagensGaleria.innerHTML += `
  <div class="card" onclick="abrirPost(${post.idPost})">
            <img src="./assets/imgPosts/${post.img}" alt="">
             <span class="curvatura c${post.curvatura}">${post.curvatura}</span>
        </div>
  `
  });
}
chamarGaleria(1,1)