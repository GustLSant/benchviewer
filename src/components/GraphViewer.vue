<script setup lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { Bar } from 'vue-chartjs';
    import type { Benchmark } from '../types';
    import { computed } from 'vue';

    // Registrar os elementos do Chart.js
    Chart.register(...registerables);

    interface Props {
    benchmarkData: Benchmark;
    }
    const props = defineProps<Props>();

    // Dados formatados para o gráfico
    const chartData = computed(() => ({
        labels: [
            'CPU Time (s)',
            'Total Time (s)',
            'CPU Max Usage (%)',
            'CPU Avg Usage (%)',
            'Memory Max Usage (MB)',
            'Memory Avg Usage (MB)'
        ],
        datasets: [
            {
            label: `Performance - ${props.benchmarkData.algorithm}`,
            backgroundColor: '#42A5F5',
            data: [
                props.benchmarkData.performance.cpuTime,
                props.benchmarkData.performance.totalTime,
                props.benchmarkData.performance.cpuMaxUsage,
                props.benchmarkData.performance.cpuAverageUsage,
                props.benchmarkData.performance.memoryMaxUsage,
                props.benchmarkData.performance.memoryAverageUsage
            ]
            }
        ]
    }));

    // Configuração de opções do gráfico
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: `Benchmark: ${props.benchmarkData.algorithm} (${props.benchmarkData.cpu})`,
                color: 'white', // Cor do título
            },
            tooltip: {
                bodyColor: 'white', // Cor do texto dentro do tooltip
                titleColor: 'white'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white' // Cor dos números do eixo X
                },
                title: {
                    color: 'white' // Cor do título do eixo X (se tiver)
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                },
                title: {
                    color: 'white'
                }
            }
        }
    };
</script>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" :width="800" :height="400" />
  </div>
</template>

<style scoped>
    div {
        max-width: 600px;
        margin: 20px auto;
    }
</style>
