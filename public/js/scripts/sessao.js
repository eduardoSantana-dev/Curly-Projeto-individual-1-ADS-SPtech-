var localUser = {};
if (localStorage.USER_ID) {
  localUser = {
    id: localStorage.USER_ID,
    nome: localStorage.USER_NOME,
    arroba: localStorage.USER_ARROBA,
    email: localStorage.USER_EMAIL,
    img: localStorage.USER_IMG,
    curvatura: localStorage.USER_CURVATURA,
  };
  setarTema(localStorage.TEMA);
} else {
  window.location = "login.html";
}

// funções globais para requisições

async function reqGet(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      dados = await res.json();
      return dados;
    } else {
      return false;
    }
  } catch (res) {
    console.log(`Erro de conexão`);
    return false;
  }
}
async function reqPost(url, jsonDados) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonDados),
    });
    if (res.ok) {
      dados = await res.json();
      return dados;
    } else {
      return false;
    }
  } catch (res) {
    console.log(`Erro de conexão`);
    return false;
  }
}
function setarTema(tema) {
  if (tema == "escuro") {
    document.documentElement.style.setProperty("--fundo", "#0f1115");
    document.documentElement.style.setProperty("--box", "#1a1d23");
    document.documentElement.style.setProperty("--roxo", "#8b5cf6");
    document.documentElement.style.setProperty("--amarelo1", "#f8ac35");
    document.documentElement.style.setProperty("--amarelo2", "#ffc161");
    document.documentElement.style.setProperty("--amarelo3", "#fe9b00");
    document.documentElement.style.setProperty("--texto1", "#e4e6eb");
    document.documentElement.style.setProperty(
      "--texto2",
      "rgba(255, 255, 255, 0.65)",
    );
    document.documentElement.style.setProperty(
      "--sombra",
      "0px 0px 10px 0px rgba(0,0,0,0.6)",
    );
    document.documentElement.style.setProperty("--cinza", "#2a2d34");
    document.documentElement.style.setProperty("--cinza2", "#20232a");
    document.documentElement.style.setProperty("--cinza3", "#333333");
  } else if (tema == "claro") {
    document.documentElement.style.setProperty("--fundo", "#F0F2F5");
    document.documentElement.style.setProperty("--box", "#fff");
    document.documentElement.style.setProperty("--roxo", "#693B99");
    document.documentElement.style.setProperty("--amarelo1", "#F8AC35");
    document.documentElement.style.setProperty("--amarelo2", "#FFC161");
    document.documentElement.style.setProperty("--amarelo3", "#FE9B00");
    document.documentElement.style.setProperty("--texto1", "#201919");
    document.documentElement.style.setProperty(
      "--texto2",
      "rgba(48, 48, 48, 0.72)",
    );
    document.documentElement.style.setProperty(
      "--sombra",
      "0px 0px 4px 0px hsla(0, 0%, 0%, 0.100)",
    );
    document.documentElement.style.setProperty("--cinza", "#E9E9EA");
    document.documentElement.style.setProperty("--cinza3", "#cccccc");
    document.documentElement.style.setProperty("--cinza2", "#f1f1f1");
  } else if (tema == "azul") {
    document.documentElement.style.setProperty("--fundo", "#EEF4FF");
    document.documentElement.style.setProperty("--box", "#FFFFFF");
    document.documentElement.style.setProperty("--roxo", "#3B82F6");
    document.documentElement.style.setProperty("--amarelo1", "#A855F7");
    document.documentElement.style.setProperty("--amarelo2", "#C084FC");
    document.documentElement.style.setProperty("--amarelo3", "#7E22CE");
    document.documentElement.style.setProperty("--texto1", "#1E293B");
    document.documentElement.style.setProperty(
      "--texto2",
      "rgba(30, 41, 59, 0.72)",
    );
    document.documentElement.style.setProperty(
      "--sombra",
      "0px 0px 6px 0px rgba(59, 130, 246, 0.12)",
    );
    document.documentElement.style.setProperty("--cinza", "#DCE6F8");
    document.documentElement.style.setProperty("--cinza3", "#E2E8F0");
    document.documentElement.style.setProperty("--cinza2", "#F1F5F9");
  } else if (tema == "neon") {

    document.documentElement.style.setProperty("--fundo", "#111525");
    document.documentElement.style.setProperty("--box", "#161B2E");
    document.documentElement.style.setProperty("--roxo", "#CB3CFF");
    document.documentElement.style.setProperty("--amarelo1", "#00C2FF");
    document.documentElement.style.setProperty("--amarelo2", "#5EDCFF");
    document.documentElement.style.setProperty("--amarelo3", "#009DCC");
    document.documentElement.style.setProperty("--texto1", "#FFFFFF");
    document.documentElement.style.setProperty("--texto2","rgba(255, 255, 255, 0.72)",);
    document.documentElement.style.setProperty("--sombra","0px 0px 12px 0px rgba(0, 194, 255, 0.12)",);
    document.documentElement.style.setProperty("--cinza", "#232845");
    document.documentElement.style.setProperty("--cinza3", "#2D3355");
    document.documentElement.style.setProperty("--cinza2", "#1A2035");
    
  }
}
