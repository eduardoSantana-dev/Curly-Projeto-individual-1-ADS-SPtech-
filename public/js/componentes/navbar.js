const temaNav = localStorage.TEMA;
function renderizarContainer(pesquisaContainer) {
  let conteudo = "";
  if (pesquisaContainer) {
    conteudo = pesquisaContainer;
  } else {
    conteudo = container.innerHTML;
  }
  containerGlobal.innerHTML = `
   <div class="cacheiaButton" id="cacheiaButton" onclick="abrirChat()">
        <img src="./assets/img/cacheiaBot.png" alt="">
    </div>
    <div class="chatBotContainer" id="chatBotDiv">
        <div class="topo">
            <img src="assets/img/cacheiaBot.png" alt="">
            <span class="nome">CacheIA</span>
            <i class="fa-solid fa-xmark" onclick=" chatBotDiv.classList.remove('ativo');cacheiaButton.style.display ='flex'"></i>
        </div>
        <div class="conversa" id="conversa_bot">

            
        </div>
        <form  onsubmit="enviarMsgBot(); return false">
        <input type="text" id="input_msg_para_bot" placeholder="Digite sua mensagem" oninput="button_enviar_msg.style.display ='block'">
        <button id="button_enviar_msg"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <span class="aviso">Respostas geradas por IA podem conter erros.</span>
    </div>
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
                        <span>Feed</span>
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
                    
                </div>
            </div>
        </div>
        <div class="subContainerGlobal">
            <div class="navTopo">
               <a href="index.html"> <img src="./assets/icon/${temaNav == "azul" ? "completoAzul" : temaNav == "escuro" ? "completoDark" : temaNav == "neon" ? "completoNeon" : "completo"}.svg" id="navLogo" alt=""></a>
                <div class="navTopoElements">
                     <form class="inputPesquisar" onsubmit="pesquisar(); return false">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="input_pesquisa_navbar" placeholder="Pesquisar">
                    </form>
                </div>
            </div>
            <div id="container" >
                ${conteudo}
            </div>
             </div>
        </div>


    
    `;
}
renderizarContainer();
const paginaAtual = window.location.href;
if (paginaAtual.includes("galeria")) {
  acessoGaleria.style.color = "var(--amarelo1)";
} else if (paginaAtual.includes("configuracao")) {
  acessoConfig.style.color = "var(--amarelo1)";
} else if (paginaAtual.includes("sobre")) {
  acessoSobre.style.color = "var(--amarelo1)";
} else {
  acessoInicio.style.color = "var(--amarelo1)";
}

async function pesquisar() {
  const pesquisa = input_pesquisa_navbar.value;

  const resultado = await reqGet(
    `/posts/pesquisar/${pesquisa}/${localUser.id}`,
  );
  const posts = resultado.data.posts;
  const usuarios = resultado.data.usuarios;
  if (posts.length > 0 || usuarios.length > 0) {
    let listaUsuarios = ``;
    usuarios.forEach((user) => {
      listaUsuarios += `
    <a href="perfil.html?id=${user.idUsuario}" class="perfil">
                        <div class="imgUserPerfilDiv">
                            <img src="assets/userPerfil/${user.img}" alt=""
                                id="imgUserPerfil">
                        </div>
                        <div class="nomeArroba">
                            <span class="nomeUserPerfilPesquisa ">${user.nome}</span>
                            <span class="usuarioUserPerfilPesquisa ">@${user.arroba}</span>
                        </div>
                    </a>
    `;
    });
    let containerPesquisa = `
         <div class="containerPesquisa" style="margin-top:0px">
            <span class="tituloPesquisa">Resultado para:'${pesquisa}'</span>
            <div class="usuariosPesquisados box">
                <p>Pessoas</p>
                <div class="lista" >
                ${listaUsuarios}
                </div>
            </div>
            <div id="feedPost" class="feedPesquisa"></div>
        </div>
        `;
    await renderizarContainer(containerPesquisa);
    listarPost(posts, feedPost);
  } else {
    let constainerVazio = `
      <div class="containerPesquisa" style="margin-top:0px">
        <p class="resVazio">Nenhum resultado encontrado</p>
      </div>
    `;
    renderizarContainer(constainerVazio);
  }
  input_pesquisa_navbar.value = pesquisa;
  input_pesquisa_navbar.focus();
   container.style.justifyContent = 'flex-start';

 
}


// codigos do CacheIA 
const chatConversa = document.getElementById("conversa_bot"); 
function abrirChat(){
  chatBotDiv.classList.add('ativo');
  cacheiaButton.style.display ='none'
  chatConversa.scrollTop = chatConversa.scrollHeight;

}

if (sessionStorage.CHAT != undefined) {
  chatConversa.innerHTML = sessionStorage.CHAT;
} else {
  sessionStorage.CHAT = `
    <p class="mensagem botMsg">
    Olá ${localUser.nome}!  
    Eu sou o CacheIA, seu assistente de cachos da Curly ✨  
    Estou aqui para te ajudar com dicas, cuidados e inspirações para valorizar ainda mais seus cachos 😊
    </p>
    `;
  sessionStorage.CONVERSA = `CacheIA:
    Olá ${localUser.nome}!  
    Eu sou o CacheIA, seu assistente de cachos da Curly ✨  
    Estou aqui para te ajudar com dicas, cuidados e inspirações para valorizar ainda mais seus cachos 😊;
    `;
  chatConversa.innerHTML = sessionStorage.CHAT;
  sessionStorage.CONVERSACONTAGEM = 0
  console.log(sessionStorage.CHAT);
}


async function enviarMsgBot() {
  let msg = input_msg_para_bot.value;
  let contadorDeMSG = sessionStorage.CONVERSACONTAGEM
  input_msg_para_bot.value = "";

  chatConversa.innerHTML += `
     <p class="mensagem UserMsg">
               ${msg}
            </p>
    `;
  
  chatConversa.innerHTML += `
     <p class="mensagem botMsg" id="botMsgCarregando${contadorDeMSG}">
               Só um momento...
            </p>
    `;
  chatConversa.scrollTop = chatConversa.scrollHeight;

  resposta = await reqPost("/perguntar", {
    pergunta: msg,
    conversa: sessionStorage.CONVERSA,
  });
  console.log(resposta.resultado);
  document.getElementById(`botMsgCarregando${contadorDeMSG}`).style.display = "none";
  contadorDeMSG++;

  chatConversa.innerHTML += `
     <p class="mensagem botMsg">
               ${resposta.resultado}
            </p>
    `;
  sessionStorage.CHAT = chatConversa.innerHTML;
  sessionStorage.CONVERSA += `Usuario: ${msg}; CacheIA:${resposta.resultado};`;
  sessionStorage.CONVERSACONTAGEM = contadorDeMSG
}
