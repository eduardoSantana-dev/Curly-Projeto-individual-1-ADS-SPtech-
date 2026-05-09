async function buscarDados() {
  const dados = await reqGet("/admin/dadosDash");
  console.log(dados.data);
  await setarKpiEGraficoRosca(dados.data.kpisGraficosRosca[0]);
  await setarGraficoUsuarios(dados.data.graficoUsuario);
  await setarListaUsuarios(dados.data.populares, dados.data.ultimosCadastros);
  carregarGraficos();
}
buscarDados();

function setarKpiEGraficoRosca(dados) {
  const usersOndulados = dados.usuarios_ondulado;
  const usersCacheados = dados.usuarios_cacheado;
  const usersCrespos = dados.usuarios_crespo;
  const qtdUsuarios = dados.usuarios;
  const postsOndulados = dados.posts_ondulado;
  const postsCacheados = dados.posts_cacheado;
  const postsCrespos = dados.posts_crespo;
  const qtdPosts = dados.postagens;
  qtdUsuarioSpan.innerHTML = qtdUsuarios;
  qtdPostsSpan.innerHTML = qtdPosts;
  usersPorCurvaturaDados = [usersOndulados, usersCacheados, usersCrespos];
  postsPorCurvaturaDados = [postsOndulados, postsCacheados, postsCrespos];
  tiposListasUsers.innerHTML = `
     <div class="tipo"><span style="border-color: var(--azul2);"></span>
                                <p>Ondulado (${((usersOndulados / qtdUsuarios) * 100).toFixed(1)}%)</p>
                            </div>
                            <div class="tipo"><span style="border-color: var(--azul4);"></span>
                                <p>Cacheado (${((usersCacheados / qtdUsuarios) * 100).toFixed(1)}%)</p>
                            </div>
                            <div class="tipo"><span style="border-color: var(--azul3);"></span>
                                <p>Crespo (${((usersCrespos / qtdUsuarios) * 100).toFixed(1)}%)</p>
                            </div>
    `;
  tiposListasPosts.innerHTML = `
      <div class="tipo"><span style="border-color: var(--azul2);"></span>
                                <p>Ondulado (${((postsOndulados / qtdPosts) * 100).toFixed(1)}%)</p>
                            </div>
                            <div class="tipo"><span style="border-color: var(--azul4);"></span>
                                <p>Cacheado (${((postsCacheados / qtdPosts) * 100).toFixed(1)}%)</p>
                            </div>
                            <div class="tipo"><span style="border-color: var(--azul3);"></span>
                                <p>Crespo (${((postsCrespos / qtdPosts) * 100).toFixed(1)}%)</p>
                            </div>
    `;
}
function setarGraficoUsuarios(dados) {
  dados.forEach((registro) => {
    const data = new Date(registro.dia).toLocaleDateString("pt-BR");
    dataUsuarioDados.push(data.substring(0, 5));
    qtdUsuarioDados.push(registro.usuarios);
    if (registro.usuarios < dataUsuarioMin) {
      if (registro.usuarios - 5 > 0) {
        dataUsuarioMin = registro.usuarios - 5;
      } else {
        dataUsuarioMin = 0;
      }
    }
    if (registro.usuarios > dataUsuarioMax) {
      dataUsuarioMax = registro.usuarios + 5;
    }
  });
}
function setarListaUsuarios(populares, ultimosCadastros) {
  populares.forEach((usuario) => {
    listaPopularesPerfil.innerHTML += `
     <div class="perfil">
                           
                                <img src="../assets/userPerfil/${usuario.img}" alt="" id="imgUserPerfil">
                            
                            <div class="nomeArroba">
                                <span class="nomeUserPerfil">${usuario.nome}</span>
                                <span class="usuarioUserPerfil">@${usuario.arroba}</span>
                            </div>
                        </div>
    `;
  });
    ultimosCadastros.forEach((usuario) => {
    listaCadastrosPerfil.innerHTML += `
     <div class="perfil">
                           
                                <img src="../assets/userPerfil/${usuario.img}" alt="" id="imgUserPerfil">
                            
                            <div class="nomeArroba">
                                <span class="nomeUserPerfil">${usuario.nome}</span>
                                <span class="usuarioUserPerfil">@${usuario.arroba}</span>
                            </div>
                        </div>
    `;
  });
}
