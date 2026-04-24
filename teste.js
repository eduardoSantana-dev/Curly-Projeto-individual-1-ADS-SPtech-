

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
async function imprimir() {
  a = {
    "id":102
}
  console.log(await reqPost('http://localhost:3333/usuarios/testePOST',a))
}

imprimir()