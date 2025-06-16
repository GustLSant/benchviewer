<script setup lang="ts">
    import type { BenchmarkMetric } from '../types';
    import { Bar } from 'vue-chartjs';
    import {
        Chart,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js';

    // Registro das escalas e componentes necessários
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    interface Props {
        title:string,
        metric: BenchmarkMetric,
        data: {
            [label:string]: number
        }[];
    }
    const props = defineProps<Props>();


    const labels = props.data.map(obj => Object.keys(obj)[0]);
    const values = props.data.map(obj => Object.values(obj)[0]);
    const colors = props.data.map((_, index) =>
        index % 2 === 0 ? 'red' : 'blue'
    );


    // Dados formatados para o gráfico
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: props.metric,
                backgroundColor: colors,
                data: values
            }
        ]
    };

    // Configuração de opções do gráfico
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: props.title,
                color: 'white',
            },
            tooltip: {
                bodyColor: 'white',
                titleColor: 'white'
            }
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
                    color: 'white'
                },
                title: {
                    display: true,
                    text: 'Seconds',
                    color: 'white'
                }
            }
        }
    };
</script>


<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>