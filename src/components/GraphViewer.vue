<script setup lang="ts">
    import type { Benchmark, GraphData } from '../types';
    import Graph from './Graph.vue';

    interface Props { benchmarks: Benchmark[]; }
    const props = defineProps<Props>();

    const totalTimeBenchmarks: GraphData[] = [];
    const cpuTimeBenchmarks: GraphData[] = [];
    const cpuMaxUsageBenchmarks: GraphData[] = [];
    const cpuAverageUsageBenchmarks: GraphData[] = [];
    const memoryMaxUsageBenchmarks: GraphData[] = [];
    const memoryAverageUsageBenchmarks: GraphData[] = [];
    
    Object.values(props.benchmarks).forEach((b: Benchmark) => {
        const idx = totalTimeBenchmarks.findIndex((graphData: GraphData) => graphData.algorithm === b.algorithm);

        if(idx !== -1){ // ja existem dados para esse benchmark desse algoritmo (so adiciona)
            totalTimeBenchmarks[idx].data.push({
                [b.device]: b.performance.totalTime
            })
        }
        else{ // nao existem dados sobre esse benchmark desse algoritmo (cria um novo)
            totalTimeBenchmarks.push({
                title: "Benchmark - " + b.algorithm + " - Total Time",
                algorithm: b.algorithm,
                metric: "Total Time",
                data: [{
                    [b.device]: b.performance.totalTime
                }]
            })
        }
    })
</script>

<template>
  <div>
    <!-- <Bar :data="chartData" :options="chartOptions" :width="800" :height="400" /> -->
     <Graph v-for="bch in totalTimeBenchmarks" :title="bch.title" :metric="bch.metric" :data="bch.data"  />
     <p @click="console.log(totalTimeBenchmarks)">adwad</p>
  </div>
</template>

<style scoped>
    div {
        max-width: 600px;
        margin: 20px auto;
    }
</style>
