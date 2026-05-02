async function cadastrar(nome, arroba, email, data, senha, curvatura, foto) {
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("arroba", arroba);
  formData.append("email", email);
  formData.append("data", data);
  formData.append("senha", senha);
  formData.append("curvatura", curvatura);
  if (foto != undefined) {
    formData.append("foto", foto);
  }

  try {
    const res = await fetch("/usuarios/cadastrar", {
      method: "POST",
      body: formData,
    });
    if (res.status == 201) {
      window.location = "login.html";
    } else {
      alert("Erro ao realizar cadastro");
    }
  } catch (err) {
    console.log(err);
    alert("Falha ao conectar");
  }
}

async function login() {
  try {
    const usuario = await fetch("/usuarios/logar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email_input.value,
        senha: senha_input.value,
      }),
    });
    let dados = await usuario.json();
    if (dados) {
      localStorage.USER_ID = dados.id;
      localStorage.USER_NOME = dados.nome;
      localStorage.USER_ARROBA = dados.arroba;
      localStorage.USER_EMAIL = dados.email;
      localStorage.USER_IMG = dados.img;
      localStorage.USER_CURVATURA = dados.curvatura;
      window.location = "index.html";
    } else {
      erroLogin.style = "display:flex";
    }
  } catch (err) {
    console.log(err);
  }
}



async function seguir(idPerfil) {
  try {
    const usuario = await fetch("/usuarios/seguirPerfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: localUser.id,
        idPerfil,
      }),
    });
   if(await usuario.json()){
   const botoes = document.querySelectorAll(`.idButtonSeguir${idPerfil}`)
   botoes.forEach(b => {
    b.classList.add('seguindo')
    b.innerHTML = "Seguindo"
    b.onclick = () => deixarDeSeguir(idPerfil)
   });
   }
  } catch (err) {
    console.log(err);
  }
}
async function deixarDeSeguir(idPerfil) {
  try {
    const usuario = await fetch("/usuarios/deixarDeSeguir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: localUser.id,
        idPerfil,
      }),
    });
   if(await usuario.json()){
   const botoes = document.querySelectorAll(`.idButtonSeguir${idPerfil}`)
   botoes.forEach(b => {
    b.classList.remove('seguindo')
    b.innerHTML = "Seguir"
    b.onclick = () => seguir(idPerfil)
   });
   }
  } catch (err) {
    console.log(err);
  }
}
  

async function atualizarUser(nome,arroba,email,novaSenha,img,senha){

  const formData = new FormData();
      formData.append("nome", nome);
      formData.append("arroba", arroba);
      formData.append("email", email);
      formData.append("senha", novaSenha);
      formData.append("id", localUser.id);
      if (img != undefined) {
        formData.append("foto", img);
      }
      const res = await fetch("/usuarios/update", {
        method: "POST",
        body: formData,
      });
      if (novaSenha.length > 0) {
        senha = novaSenha;
      }
      const user = {
        email: email,
        senha,
      };
      const dados = await reqPost("/usuarios/logar", user);
      if (dados) {
        localStorage.USER_NOME = dados.nome;
        localStorage.USER_ARROBA = dados.arroba;
        localStorage.USER_EMAIL = dados.email;
        localStorage.USER_IMG = dados.img;
        localStorage.USER_CURVATURA = dados.curvatura;
        window.location.reload();
      }
}


