<script setup lang="ts">
    import type { GraphData } from '../types';
    import { getChartOptions } from '../utils';
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
    import { Bar } from 'vue-chartjs';

    
    // Registro das escalas e componentes necessários
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    interface Props { graphData: GraphData }
    const props = defineProps<Props>();

    
    // Dados formatados para o gráfico
    const chartData = {
        labels: props.graphData.labes,
        datasets: props.graphData.datasets
    };

    
    const chartOptions = getChartOptions(props.graphData.title, props.graphData.yAxisLabel);
</script>


<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>