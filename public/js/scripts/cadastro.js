function verSenha() {
    if (senha_input.type == "text") {
        senha_input.type = "password";
        olho.innerHTML = `<i class="fa-regular fa-eye-slash" onclick="verSenha()" ></i>`;
    } else {
        senha_input.type = "text";
        olho.innerHTML = `<i class="fa-regular fa-eye" onclick="verSenha()" ></i>`;
    }
}
function verSenhaConfirmacao() {
    if (confirmacao_input.type == "text") {
        confirmacao_input.type = "password";
        olho2.innerHTML = `<i class="fa-regular fa-eye-slash" onclick="verSenhaConfirmacao()" ></i>`;
    } else {
        confirmacao_input.type = "text";
        olho2.innerHTML = `<i class="fa-regular fa-eye" onclick="verSenhaConfirmacao()" ></i>`;
    }
}
function selecionarCurvatura(curvatura) {
    let selecionado = document.getElementById(curvatura);
    document.querySelectorAll(".curvaturasSelectbutton").forEach((item) => {
        item.classList.remove("selecionado");
    });
    selecionado.classList.add("selecionado");
    curvatura_input.value = curvatura;
}
function mostrarPreview(){
    if(inserirImagem.value !=''){
        previewImg.src = URL.createObjectURL(inserirImagem.files[0])
    }
}

var listaDivInvalidas = []

function validar(campo) {
    let tudoCerto = true
    let nome = nome_input.value;
    let arroba = arroba_input.value;
    let email = email_input.value;
    let dataNasc = dataNasc_input.value;
    let senha = senha_input.value;
    let confirmacao = confirmacao_input.value;
    for (let i = listaDivInvalidas.length - 1; i >= 0; i--) {
        listaDivInvalidas[i].innerHTML = ""
        listaDivInvalidas.splice(i)
    }
    nome_input.parentElement.classList.remove('inputInvalido')
    arroba_input.parentElement.classList.remove('inputInvalido')
    email_input.parentElement.classList.remove('inputInvalido')
    dataNasc_input.parentElement.classList.remove('inputInvalido')
    senha_input.parentElement.classList.remove('inputInvalido')
    
    if (nome.length < 3 && (campo == "nome" || campo == "botao")) {
        exibirInvalido(invalidoNome, "Nome muito pequeno");
        nome_input.parentElement.classList.add('inputInvalido')
        tudoCerto = false
    }
    if(campo == "arroba" || campo == "botao"){
        if (arroba.length < 3) {
            exibirInvalido(invalidoArroba, "O nome de usuario muito pequeno");
            arroba_input.parentElement.classList.add('inputInvalido')
            tudoCerto = false
        }else{
            verificarUnique('arroba', arroba);
        }
    }
    if(campo == "email" || campo == "botao"){
        if ((!email.includes("@") || !email.includes("."))) {
            exibirInvalido(invalidoEmail, "Insira um email valido");
            email_input.parentElement.classList.add('inputInvalido')
            tudoCerto = false
        }else{
            verificarUnique("email", email);
        }

    }
    if (dataNasc == "" && (campo == "data" || campo == "botao")) {
        exibirInvalido(invalidoData, "Insira uma data de nascimento");
        dataNasc_input.parentElement.classList.add('inputInvalido')
        tudoCerto = false
    }
    if (campo == "senha" || campo == "botao") {
        let forca = 0
        if (senha.length > 8) {
            forca += 2
        }
        if (senha.toLowerCase() != senha && senha.toUpperCase() != senha) {
            forca += 2
        }
        if (senha.includes('!') || senha.includes('@') || senha.includes('#') || senha.includes('$') || senha.includes('%') || senha.includes('&') || senha.includes('*')) {
            forca += 4
        }
        if (nome != '' && senha.toLowerCase().includes(nome.toLowerCase())) {
            forca -= 4
        }
        if (senha.includes('0') || senha.includes('1') || senha.includes('2') || senha.includes('3') || senha.includes('4') || senha.includes('5') || senha.includes('6') || senha.includes('7') || senha.includes('8') || senha.includes('9')) {
            forca += 2
        }
        if (senha.length < 2) {
            senhaNivel.innerHTML = `<span style="color: red;">Muito pequena</span>`
            tudoCerto = false
        }
        else if (forca < 4) {
            senhaNivel.innerHTML = `<span style="color: red;">Fraca</span>`
        } else if (forca < 9) {
            senhaNivel.innerHTML = `<span style="color: var(--amarelo3);">OK</span>`
        } else {
            senhaNivel.innerHTML = `<span style="color: green;">Forte!</span>`
        }
    }
    if (senha != confirmacao && (campo == "confirmacao" || campo == "botao")) {
        exibirInvalido(invalidoCorfimacao, "As senhas não são iguais. Tente novamente.");
        dataNasc_input.parentElement.classList.add('inputInvalido')
        tudoCerto = false
    }
    
    if(tudoCerto && campo =="botao" && curvatura_input.value != ''){
     cadastrar(nome,arroba,email,dataNasc,senha,curvatura_input.value,inserirImagem.files[0])
    }
}

function exibirInvalido(div, mensagem) {
        listaDivInvalidas.push(div)
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
        }else{
             exibirInvalido(invalidoEmail, "Já existe uma conta com esse email");
            email_input.parentElement.classList.add('inputInvalido')
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
