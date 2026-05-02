async function buscarPopulares() {
  const populares = await reqGet("/usuarios/populares");
  console.log(populares.data);
  populares.data.forEach((user) => {
    listaPopulares.innerHTML += `
        <a href="perfil.html?id=${user.idUsuario}" class="perfil">
                        <div class="imgUserPerfilDiv">
                            <img src="assets/userPerfil/${user.img}" alt=""
                                id="imgUserPerfil">
                        </div>
                        <div class="nomeArroba">
                            <span class="nomeUserPerfilPopulares ">${user.nome}</span>
                            <span class="usuarioUserPerfilPopulares ">@${user.arroba}</span>
                        </div>
                    </a>
        `;
  });
}

chamarNovoCardInput();
buscarPost(ordemPost.value, filtroPost.value);
buscarPost(ordemPost.value, filtroPost.value);
buscarPopulares();
