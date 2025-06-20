export const barColors = [
  "#4C72B0", // Azul Suave
  "#DD8452", // Laranja
  "#55A868", // Verde Médio
  "#C44E52", // Vermelho Suave
  "#8172B2", // Roxo Claro
];


export function getChartOptions(_title: string, _yAxisLabel: string){
    return({
        responsive: true,
        maintainAspectRatio: false, // permite o gráfico usar a altura total disponível da div pai

        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: _title,
                color: 'white',
            },
            tooltip: {
                bodyColor: 'white',
                titleColor: 'white'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                title: {
                    display: true,
                    text: 'Device',
                    color: 'white'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                },
                title: {
                    display: true,
                    text: _yAxisLabel,
                    color: 'white'
                }
            }
        }
    })
}
