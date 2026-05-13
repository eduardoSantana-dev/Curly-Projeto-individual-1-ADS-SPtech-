nav.innerHTML = `

        <div class="logo"><img src="../assets/icon/SimboNeon.svg" alt=""> <span class="textosNav">Administrativo</span></div>
        <div class="perfil"><img src="../assets/userPerfil/semImg.png" alt=""><span class="textosNav">${localAdm.nome}</span></div>
        <a href="dashboard.html" class="acesso " id="acessoDash">
            <i class="fa-regular fa-house"></i>
            <span class="textosNav">Dashboard</span>
        </a>
         <a href="usuarios.html" class="acesso"  id="acessoUser">
            <i class="fa-regular fa-user"></i>
            <span class="textosNav">Usuários</span>
        </a>
         <a href="posts.html" class="acesso"  id="acessoPosts">
            <i class="fa-regular fa-compass"></i>
            <span class="textosNav">Posts</span>
        </a>
        <a href = "login.html" class="acesso" onclick="sessionStorage.clear()">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span class="textosNav">Sair</span>
        </a>
         
       
    
`;

const paginaAtual = window.location.href;
if (paginaAtual.includes("usuarios")) {
  acessoUser.classList.add("acessoSelecionado");
} else if (paginaAtual.includes("posts")) {
  acessoPosts.classList.add("acessoSelecionado");
} else if (paginaAtual.includes("config")) {
  acessoConfig.classList.add("acessoSelecionado");
} else {
  acessoDash.classList.add("acessoSelecionado");
}
