 
 
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
}else{
    window.location = "login.html"  
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