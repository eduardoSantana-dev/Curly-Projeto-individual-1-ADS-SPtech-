 const linha1 = document.getElementById('graficoLinhaUsers');

    new Chart(linha1, {
        type: 'line',
        data: {
            labels: ['01/05', '02/05', '03/05', '04/05', '05/05', '06/05'],
            datasets: [{
                label: 'Usuários',
                data: [12, 15, 10, 7, 15, 13],
                borderWidth: 2,
                borderColor: '#00C2FF',
                tension: 0.4,
                pointRadius: 2,
                fill:false,
                backgroundColor:'#00c3ff1e'

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 5,
                    max: 20,
                    grid: {
                        color: '#354155a5',
                        lineWidth: 1,
                        drawBorder: false,
                        drawTicks: false
                    },
                    ticks: {
                        padding: 15,
                        color: '#fff',
                    }
                },
                x: {

                    grid: {
                        color: '#354155a5',
                        lineWidth: 1,
                        drawBorder: false,
                        drawTicks: false
                    },
                     ticks: {
                        padding: 5,
                        color: '#fff',
                    }
                }
            }
        }
    });


     const rosca1 = document.getElementById('usersPorCurvatura');

    new Chart(rosca1, {
        type: 'doughnut',
        data: {
            labels: ['Ondulado', 'Cacheado', 'Crespo'],
            datasets: [{

                data: [40, 30, 20],
                borderWidth: 0,
                backgroundColor: [
                    '#00FFEE',
                    '#003CFF',
                    '#146F9B'
                ],
                hoverOffset: 10,
               cutout:'65%%',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        lineWidth: 0,
                        display: false

                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        lineWidth: 0,
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });

  const rosca2 = document.getElementById('postsPorCurvatura');

    new Chart(rosca2, {
        type: 'doughnut',
        data: {
            labels: ['Ondulado', 'Cacheado', 'Crespo'],
            datasets: [{

                data: [21, 53, 26],
                borderWidth: 0,
                backgroundColor: [
                    '#00FFEE',
                    '#003CFF',
                    '#146F9B'
                ],
                hoverOffset: 10,
               cutout:'65%',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        lineWidth: 0,
                        display: false

                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        lineWidth: 0,
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });


      const linha2 = document.getElementById('graficoLinhaPosts');

    new Chart(linha2, {
        type: 'line',
        data: {
            labels: ['0:00-2:59', '3:00-5:59', '6:00-8:59', '9:00-11:59', '12:00-14:59', '15:00-17:59', '18:00-20:59', '21:00-23:59'],
            datasets: [{
                label: 'Posts',
              data: [8, 5, 18, 42, 58, 74, 95, 70],
                borderWidth: 2,
                borderRadius: 3,
                borderColor: '#00C2FF',
                backgroundColor: '#00C2FF',
                tension: 0.2,

            },
            {
                label: 'Curtidas',
                  data: [40, 25, 120, 150, 140, 160, 110, 170],
                borderWidth: 2,
                borderRadius: 3,
                borderColor: '#CB3CFF',
                backgroundColor: '#CB3CFF',
          
                tension: 0.2,

            }
                ,
            {
                label: 'Comentarios',
                 data: [5, 3, 18, 60, 95, 140, 110, 170],
                borderWidth: 2,
                borderRadius: 3,
                borderColor: '#FFFFFF',
                backgroundColor: '#FFFFFF',
    
                tension: 0.2,

            }
            ]

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
                        color: '#354155a5',
                        lineWidth: 1,
                        drawBorder: false,
                        drawTicks: false
                    },
                    ticks: {
                        padding: 15,
                        color: '#fff',
                    }
                },
                x: {

                    grid: {
                        color: '#354155a5',
                        lineWidth: 1,
                        drawBorder: false,
                        drawTicks: false
                    },
                    ticks: {
                        padding: 5,
                        color: '#fff',
                    }
                }
            }
        }
    });