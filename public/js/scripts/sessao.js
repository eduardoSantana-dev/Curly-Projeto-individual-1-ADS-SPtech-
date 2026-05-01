 
 
 var localUser = {
 }
if(localStorage.USER_ID){
    localUser = {
    id:localStorage.USER_ID,
     nome : localStorage.USER_NOME,
     arroba : localStorage.USER_ARROBA,
     email : localStorage.USER_EMAIL,
     img : localStorage.USER_IMG,
     curvatura : localStorage.USER_CURVATURA,
    }
    setarTema(localStorage.TEMA)
}else{
     // window.location = "login.html"  
}

// funções globais para requisições 

async function reqGet(url){
  try{
    const res = await fetch(url)
    if(res.ok){
      dados = await res.json()
      return dados
    }else{
      return false
    }
  }catch(res){
    console.log(`Erro de conexão`)
    return false
  }
}
async function reqPost(url,jsonDados){
  try{
    const res = await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body :JSON.stringify(
        jsonDados
      )
    }
    )
    if(res.ok){
      dados = await res.json()
      return dados
    }else{
      return false
    }
  }catch(res){
    console.log(`Erro de conexão`)
    return false
  }
}
function setarTema(tema){
  if (tema == 'escuro'){
document.documentElement.style.setProperty('--fundo', '#0f1115');
document.documentElement.style.setProperty('--box', '#1a1d23');
document.documentElement.style.setProperty('--roxo', '#8b5cf6');
document.documentElement.style.setProperty('--amarelo1', '#f8ac35');
document.documentElement.style.setProperty('--amarelo2', '#ffc161');
document.documentElement.style.setProperty('--amarelo3', '#fe9b00');
document.documentElement.style.setProperty('--texto1', '#e4e6eb');
document.documentElement.style.setProperty('--texto2', 'rgba(255, 255, 255, 0.65)');
document.documentElement.style.setProperty('--sombra','0px 0px 10px 0px rgba(0,0,0,0.6)');
document.documentElement.style.setProperty('--cinza', '#2a2d34');
document.documentElement.style.setProperty('--cinza2', '#20232a');
document.documentElement.style.setProperty('--cinza3', '#333333');
  }
}




