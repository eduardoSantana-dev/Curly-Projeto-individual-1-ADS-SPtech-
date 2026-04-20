 try{
    fetch("/usuarios/cadasrar", {
      method: "POST",
      body: formData,
    })
   console.log("ok")
  }catch(err){
    console.log(err)
    console.log('Erro ao realizar cadastro')
  }