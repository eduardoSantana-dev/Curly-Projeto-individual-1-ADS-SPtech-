let usersPorCurvaturaDados = [];
let postsPorCurvaturaDados = [];
let qtdUsuarioDados = [];
let dataUsuarioDados = [];
let dataUsuarioMin = 1000;
let dataUsuarioMax = 0;
let listaPostsPorHora =[]
let listaComentariosPorHora =[]
let listaCurtidasPorHora =[]
function carregarGraficos() {
  let gridColor = "#354155a5";
  let ticksColor = "#fff";
  let linhaComentarioColor = "#F8AC35";
  const linha1 = document.getElementById("graficoLinhaUsers");

  new Chart(linha1, {
    type: "line",
    data: {
      labels: dataUsuarioDados,
      datasets: [
        {
          label: "Usuários",
          data: qtdUsuarioDados,
          borderWidth: 2,
          borderColor: "#00C2FF",
          tension: 0.4,
          pointRadius: 2,
          fill: false,
          backgroundColor: "#00c3ff1e",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: dataUsuarioMin,
          max: dataUsuarioMax,
          grid: {
            color: gridColor,
            lineWidth: 1,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 15,
            color: ticksColor,
            stepSize: 1,
          },
        },
        x: {
          grid: {
            color: gridColor,
            lineWidth: 1,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 5,
            color: ticksColor,
          },
        },
      },
    },
  });

  const rosca1 = document.getElementById("usersPorCurvatura");

  new Chart(rosca1, {
    type: "doughnut",
    data: {
      labels: ["Ondulado", "Cacheado", "Crespo"],
      datasets: [
        {
          data: usersPorCurvaturaDados,
          borderWidth: 0,
          backgroundColor: ["#00F5FF", "#007BFF", "#5B3CFF"],
          hoverOffset: 10,
          cutout: "65%%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            lineWidth: 0,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            lineWidth: 0,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });

  const rosca2 = document.getElementById("postsPorCurvatura");

  new Chart(rosca2, {
    type: "doughnut",
    data: {
      labels: ["Ondulado", "Cacheado", "Crespo"],
      datasets: [
        {
          data: postsPorCurvaturaDados,
          borderWidth: 0,
           backgroundColor: ["#00F5FF", "#007BFF", "#5B3CFF"],
          hoverOffset: 10,
          cutout: "65%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            lineWidth: 0,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            lineWidth: 0,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });

  const linha2 = document.getElementById("graficoLinhaPosts");

  new Chart(linha2, {
    type: "line",
    data: {
      labels: [
        "0:00-7:00",
        "7:00-12:00",
        "12:00-18:00",
        "18:00-23:00",
      ],
      datasets: [
        {
          label: "Posts",
          data: listaPostsPorHora,
          borderWidth: 2,
          borderRadius: 3,
          borderColor: "#00C2FF",
          backgroundColor: "#00C2FF",
          tension: 0.2,
        },
        {
          label: "Curtidas",
          data: listaComentariosPorHora,
          borderWidth: 2,
          borderRadius: 3,
          borderColor: "#CB3CFF",
          backgroundColor: "#CB3CFF",

          tension: 0.2,
        },
        {
          label: "Comentarios",
          data: listaComentariosPorHora,
          borderWidth: 2,
          borderRadius: 3,
          borderColor: linhaComentarioColor,
          backgroundColor: linhaComentarioColor,

          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          grid: {
            color: gridColor,
            lineWidth: 1,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 15,
            color: ticksColor,
          },
        },
        x: {
          grid: {
            color: gridColor,
            lineWidth: 1,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 5,
            color: ticksColor,
          },
        },
      },
    },
  });
}
