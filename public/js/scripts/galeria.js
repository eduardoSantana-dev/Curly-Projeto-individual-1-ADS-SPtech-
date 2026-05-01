async function chamarGaleria(filtro,ordem) {
  if(filtro == 'igual'){
    filtro = localUser.curvatura
  }

  const posts = await reqGet(`posts/galeria/${filtro}/${ordem}`)
  console.log(posts)
  listaImagensGaleria.innerHTML =''
  posts.data.forEach(post => {
    listaImagensGaleria.innerHTML += `
  <div class="card" onclick="abrirPost(${post.idPost})">
            <img src="./assets/imgPosts/${post.img}" alt="">
             <span class="curvatura c${post.curvatura}">${post.curvatura}</span>
        </div>
  `
  });
}
const selecaoFiltro = window.location.href[window.location.href.length -1] 
if(selecaoFiltro !='l'){
 filtroPost.value = selecaoFiltro 
}
chamarGaleria(filtroPost.value,ordemPost.value)