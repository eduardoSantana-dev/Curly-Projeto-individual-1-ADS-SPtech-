var localAdm = {};
if(!window.location.href.includes('login')){
    if (sessionStorage.ADM_ID ) {
      localAdm = {
        id: sessionStorage.ADM_ID,
        nome: sessionStorage.ADM_NOME,
        email: sessionStorage.ADM_EMAIL,
      };
    } else {
     window.location = "login.html";
    }
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

