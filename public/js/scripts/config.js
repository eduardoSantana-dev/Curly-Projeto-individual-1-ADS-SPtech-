nome_input.value = localUser.nome;
arroba_input.value = localUser.arroba;
email_input.value = localUser.email;
imgAlterarImg.src = `assets/userPerfil/${localUser.img}`;

function mostrarPreview() {
  if (alterarImg.value != "") {
    imgAlterarImg.src = URL.createObjectURL(alterarImg.files[0]);
  }
}

if (localStorage.TEMA == "escuro") {
  bEscuro.classList.add("selecionado");
} 
else if(localStorage.TEMA == "azul"){
  bAzul.classList.add("selecionado");
}
else if(localStorage.TEMA == "neon"){
  bNeon.classList.add("selecionado");
}
else {
  bClaro.classList.add("selecionado");
}
function mudarTema(tema) {
  if (tema == "escuro") {
    setarTema("escuro");
    bAzul.classList.remove("selecionado")
    bNeon.classList.remove("selecionado")
    bEscuro.classList.add("selecionado");
    bClaro.classList.remove("selecionado");
    localStorage.TEMA = "escuro";
  } else if (tema == "azul") {
    bAzul.classList.add("selecionado")
    bNeon.classList.remove("selecionado")
    bEscuro.classList.remove("selecionado");
    bClaro.classList.remove("selecionado");
    setarTema("azul");
    localStorage.TEMA = "azul";
  } else if (tema == "neon") {
     bAzul.classList.remove("selecionado")
    bNeon.classList.add("selecionado")
    bEscuro.classList.remove("selecionado");
    bClaro.classList.remove("selecionado");
    setarTema("neon");
    localStorage.TEMA = "neon";
  } else {
     bAzul.classList.remove("selecionado")
    bNeon.classList.remove("selecionado")
    bEscuro.classList.remove("selecionado");
    bClaro.classList.add("selecionado");
    setarTema("claro");
    localStorage.TEMA = "claro";
  }
}

let listaDivInvalidas = [];
async function validar(campo) {
  let tudoCerto = true;
  let nome = nome_input.value;
  let arroba = arroba_input.value;
  let email = email_input.value;
  let novaSenha = novaSenha_input.value;
  let senha = senha_input.value;

  for (let i = listaDivInvalidas.length - 1; i >= 0; i--) {
    listaDivInvalidas[i].innerHTML = "";
    listaDivInvalidas.splice(i);
  }
  nome_input.parentElement.classList.remove("inputInvalido");
  arroba_input.parentElement.classList.remove("inputInvalido");
  email_input.parentElement.classList.remove("inputInvalido");
  senha_input.parentElement.classList.remove("inputInvalido");

  if (nome.length < 3 && (campo == "nome" || campo == "botao")) {
    exibirInvalido(invalidoNome, "Nome muito pequeno");
    nome_input.parentElement.classList.add("inputInvalido");
    tudoCerto = false;
  }
  if (campo == "arroba" || campo == "botao") {
    if (arroba.length < 3) {
      exibirInvalido(invalidoArroba, "O nome de usuario muito pequeno");
      arroba_input.parentElement.classList.add("inputInvalido");
      tudoCerto = false;
    } else if (arroba != localUser.arroba) {
      verificarUnique("arroba", arroba);
    }
  }
  if (campo == "email" || campo == "botao") {
    if (!email.includes("@") || !email.includes(".")) {
      exibirInvalido(invalidoEmail, "Insira um email valido");
      email_input.parentElement.classList.add("inputInvalido");
      tudoCerto = false;
    } else if (email != localUser.email) {
      verificarUnique("email", email);
    }
  }
  if ((campo == "novaSenha" || campo == "botao") && novaSenha.length > 0) {
    let forca = 0;
    if (novaSenha.length > 8) {
      forca += 2;
    }
    if (
      novaSenha.toLowerCase() != novaSenha &&
      novaSenha.toUpperCase() != novaSenha
    ) {
      forca += 2;
    }
    if (
      novaSenha.includes("!") ||
      novaSenha.includes("@") ||
      novaSenha.includes("#") ||
      novaSenha.includes("$") ||
      novaSenha.includes("%") ||
      novaSenha.includes("&") ||
      novaSenha.includes("*")
    ) {
      forca += 4;
    }
    if (nome != "" && novaSenha.toLowerCase().includes(nome.toLowerCase())) {
      forca -= 4;
    }
    if (
      novaSenha.includes("0") ||
      novaSenha.includes("1") ||
      novaSenha.includes("2") ||
      novaSenha.includes("3") ||
      novaSenha.includes("4") ||
      novaSenha.includes("5") ||
      novaSenha.includes("6") ||
      novaSenha.includes("7") ||
      novaSenha.includes("8") ||
      novaSenha.includes("9")
    ) {
      forca += 2;
    }
    if (novaSenha.length < 2) {
      senhaNivel.innerHTML = `<span style="color: red;">Muito pequena</span>`;
      tudoCerto = false;
    } else if (forca < 4) {
      senhaNivel.innerHTML = `<span style="color: red;">Fraca</span>`;
    } else if (forca < 9) {
      senhaNivel.innerHTML = `<span style="color: var(--amarelo3);">OK</span>`;
    } else {
      senhaNivel.innerHTML = `<span style="color: green;">Forte!</span>`;
    }
  }

  if (tudoCerto && campo == "botao") {
    const validacao = {
      senha: senha,
      idUser: localUser.id,
    };
    const verificarSenha = await reqPost("/usuarios/verificarSenha", validacao);
    if (verificarSenha.data) {
      atualizarUser(nome, arroba, email, novaSenha, alterarImg.files[0], senha);
    } else {
      exibirInvalido(invalidoSenha, "Senha invalida");
    }
  }
}
function exibirInvalido(div, mensagem) {
  listaDivInvalidas.push(div);
  div.innerHTML = `${mensagem}`;
}

async function verificarUnique(tipo, valor) {
  fetch("/usuarios/verificarCadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tipo,
      valor,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.unico) {
        tudoCerto = false;
        if (tipo == "arroba") {
          exibirInvalido(invalidoArroba, "Esse nome de usuario já está em uso");
          arroba_input.parentElement.classList.add("inputInvalido");
        } else {
          exibirInvalido(invalidoEmail, "Já existe uma conta com esse email");
          email_input.parentElement.classList.add("inputInvalido");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function verSenha(input, olho) {
  if (input.type == "text") {
    input.type = "password";
    olho.classList.add("fa-eye-slash");
    olho.classList.remove("fa-eye");
  } else {
    input.type = "text";
    olho.classList.remove("fa-eye-slash");
    olho.classList.add("fa-eye");
  }
}
