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
