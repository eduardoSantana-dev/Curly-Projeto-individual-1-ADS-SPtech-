 containerGlobal.innerHTML = `
           <div class="navLateral">
            <div class="containerNavLateral">
                <div class="perfil">
                    <div class="imgUserNavDiv">
                        <img src="assets/userPerfil/${localUser.img}" alt=""
                            id="imgUserNav">
                    </div>
                    <div class="nomeArroba">
                        <span id="nomeUserNav">${localUser.nome}</span>
                        <span id="usuarioUserNav">@${localUser.arroba}</span>
                    </div>
                </div>
                <div class="acessosNav">
                    <div class="acesso">
                        <i class="fa-regular fa-compass"></i>
                        <span>Pagina inicial</span>
                    </div>
                    <div class="acesso">
                        <i class="fa-regular fa-lightbulb"></i>
                        <span>Dicas</span>
                    </div>
                    <div class="acesso">
                        <i class="fa-solid fa-pump-soap"></i>
                        <span>Produtos</span>
                    </div>
                    <div class="acesso">
                        <i class="fa-solid fa-images"></i>
                        <span>Galeria</span>
                    </div>
                    <div class="acesso">
                        <i class="fa-solid fa-gear"></i>
                        <span>Configurações</span>
                    </div>
                    <button>Novo post</button>
                </div>
            </div>
        </div>
        <div class="subContainerGlobal">
            <div class="navTopo">
                <img src="./assets/icon/completo.svg" alt="">
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