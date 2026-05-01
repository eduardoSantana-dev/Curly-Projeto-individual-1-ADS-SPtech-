 containerGlobal.innerHTML = `
           <div class="navLateral">
            <div class="containerNavLateral">
                <a href="perfil.html?id=${localUser.id}" class="perfil">
                    <div class="imgUserNavDiv">
                        <img src="assets/userPerfil/${localUser.img}" alt=""
                            id="imgUserNav">
                    </div>
                    <div class="nomeArroba">
                        <span id="nomeUserNav">${localUser.nome}</span>
                        <span id="usuarioUserNav">@${localUser.arroba}</span>
                    </div>
                </a>
                <div class="acessosNav">
                    <a href = "/" class="acesso" id="acessoInicio">
                        <i class="fa-regular fa-compass"></i>
                        <span>Pagina inicial</span>
                    </a>
                    <a href = "#" class="acesso">
                        <i class="fa-regular fa-lightbulb"></i>
                        <span>Dicas</span>
                    </a>
                    <a href = "galeriaSelecao.html" class="acesso" id="acessoGaleria">
                    <i class="fa-solid fa-images"></i>
                    <span>Galeria</span>
                    </a>
                    <a href = "sobre.html" class="acesso" id="acessoSobre">
                       <i class="fa-solid fa-circle-info"></i>
                        <span>Sobre nós</span>
                    </a>
                    <a href = "configuracao.html" class="acesso" id="acessoConfig">
                        <i class="fa-solid fa-gear"></i>
                        <span>Configurações</span>
                    </a>
                       <a href = "login.html" class="acesso" onclick="localStorage.clear()">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Sair</span>
                    </a>
                    <button>Novo post</button>
                </div>
            </div>
        </div>
        <div class="subContainerGlobal">
            <div class="navTopo">
               <a href="index.html"> <img src="./assets/icon/completo.svg" alt=""></a>
                <div class="navTopoElements">
                    <div class="inputPesquisar">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Pesquisar">
                    </div>
                </div>
            </div>
            <div id="container" >
                ${container.innerHTML}
            </div>
             </div>
        </div>


    
    `
    const paginaAtual = window.location.href
    if(paginaAtual.includes('galeria')){
        acessoGaleria.style.color ='var(--amarelo1)'
    }else if(paginaAtual.includes('configuracao')){
        acessoConfig.style.color ='var(--amarelo1)'
    }else if(paginaAtual.includes('sobre')){
        acessoSobre.style.color ='var(--amarelo1)'

    }else{
        acessoInicio.style.color ='var(--amarelo1)'
    }