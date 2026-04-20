async function cadastrar(nome, arroba, email, data, senha, curvatura, foto) {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("arroba", arroba);
  formData.append("email", email);
  formData.append("data", data);
  formData.append("senha", senha);
  formData.append("curvatura", curvatura);
   if(foto != undefined){
    formData.append("foto", foto);
  }
  
  try{
    const res = await fetch("/usuarios/cadastrar", {
      method: "POST",
      body: formData,
    })
   if(res.status == 201){
      window.location = "login.html"
   }else{
    alert('Erro ao realizar cadastro')
   
   }
  }catch(err){
    console.log(err)
    alert('Falha ao conectar')
  }
}


async function login(){

  try{
    const usuario = await fetch("/usuarios/logar",{
    method: "POST",
     headers: {
    "Content-Type": "application/json"
  },
    body: JSON.stringify({
      email:email_input.value,
      senha:senha_input.value
    })
  })
  let dados = await usuario.json()
  if(dados){
    localStorage.IDUSER = dados.id
    window.location = 'index.html'
  }else{
    erroLogin.style = "display:flex"
  }
  }catch(err){
    console.log(err)
  }
}