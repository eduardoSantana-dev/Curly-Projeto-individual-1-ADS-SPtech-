function cadastrar(nome,arroba,email,data,senha,curvatura,foto) {
      const formData = new FormData();
      formData.append('nome', nome)
      formData.append('arroba', nome)
      formData.append('email', email)
      formData.append('data', data)
      formData.append('senha', senha)
      formData.append('curvatura', curvatura)
      formData.append('foto', foto)
        fetch("/usuarios/cadastrar", {
            method: "POST",
            body:formData,
        })
        .then(res => {
        console.log("Cadastro realizado com sucesso!")
      })
      .catch(err => {
        console.log(err);
        alert(err)
      })
    }

