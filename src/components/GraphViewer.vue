<script setup lang="ts">
    import type { Benchmark, BenchmarkGroupedByAlgorithm, GraphCollection, GraphData } from '../types';
    import { barColors } from '../utils';
    import Graph from './Graph.vue';
    import * as htmlToImage from 'html-to-image';

    interface Props { groupedBenchmarks: BenchmarkGroupedByAlgorithm[]; }
    
    const props = defineProps<Props>();
    const graphsCollection: GraphCollection[] = [];

    props.groupedBenchmarks.forEach((bgba: BenchmarkGroupedByAlgorithm) => {
        const timeGraphData: GraphData = {
            title: "Benchmark - " + bgba.algorithm + " - Total time + CPU time",
            yAxisLabel: "Milliseconds",
            labes: bgba.benchmarks.map((b: Benchmark) => b.device ),
            datasets: [
                {
                    label: "Total Time",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.totalTime ),
                    backgroundColor: barColors[0]
                },
                {
                    label: "CPU Time",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.cpuTime ),
                    backgroundColor: barColors[1]
                },
            ]
        }

        const cpuGraphData: GraphData = {
            title: "Benchmark - " + bgba.algorithm + " - CPU Max Usage + CPU Average Usage",
            yAxisLabel: "Percent",
            labes: bgba.benchmarks.map((b: Benchmark) => b.device ),
            datasets: [
                {
                    label: "CPU Max Usage",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.cpuMaxUsage ),
                    backgroundColor: barColors[2]
                },
                {
                    label: "CPU Average Usage",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.cpuAverageUsage ),
                    backgroundColor: barColors[3]
                },
            ]
        }

        const memoryGraphData: GraphData = {
            title: "Benchmark - " + bgba.algorithm + " - Memory Max Usage + Memory Average Usage",
            yAxisLabel: "Percent",
            labes: bgba.benchmarks.map((b: Benchmark) => b.device ),
            datasets: [
                {
                    label: "Memory Max Usage",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.memoryMaxUsage ),
                    backgroundColor: barColors[4]
                },
                {
                    label: "Memory Average Usage",
                    data: bgba.benchmarks.map((b: Benchmark) => b.performance.memoryAverageUsage ),
                    backgroundColor: barColors[0]
                },
            ]
        }
        
        
        graphsCollection.push({
            algorithm: bgba.algorithm,
            timeGraphData: timeGraphData,
            cpuGraphData: cpuGraphData,
            memoryGraphData: memoryGraphData
        })
    })


    const downloadChartImage = (_target: HTMLElement) => {
        const parent: HTMLElement = _target.parentElement as HTMLElement;
        const canva: HTMLElement = parent.firstElementChild!.firstElementChild as HTMLElement;
        if(canva === null){
            console.error("Error on exporting graph")
            console.error("Canva: ", canva)
            console.error("Target: ", _target)
        }

        htmlToImage.toPng(canva)
        .then((dataUrl: any) => {
            const link = document.createElement('a');
            link.download = 'grafico.png';
            link.href = dataUrl;
            link.click();
        })
        .catch((error: any) => {
            console.error('Erro ao gerar imagem:', error);
        });
    };
</script>


<template>
    <section class="flex flex-col gap-6"> 
        <div v-for="graph in graphsCollection" class="flex gap-6 wrap-normal">
            <div class="graph-section">
                <div class="graph-wrapper">
                    <Graph v-if="graph.timeGraphData" :graphData="graph.timeGraphData" />
                </div>
                <button class="enbled" @click="(event) => downloadChartImage(event.currentTarget as HTMLElement)">Download</button>
            </div>
           <div class="graph-section">
                <div class="graph-wrapper">
                    <Graph v-if="graph.cpuGraphData" :graphData="graph.cpuGraphData" />
                </div>
                <button class="enbled" @click="(event) => downloadChartImage(event.currentTarget as HTMLElement)">Download</button>
            </div>
            <div class="graph-section">
                <div class="graph-wrapper">
                    <Graph v-if="graph.memoryGraphData" :graphData="graph.memoryGraphData" />
                </div>
                <button class="enbled" @click="(event) => downloadChartImage(event.currentTarget as HTMLElement)">Download</button>
            </div>
        </div>
    </section>
</template>


<style scoped>
    .graph-section{
        flex: 1 1 30%; /* Faz cada section ocupar aproximadamente 30% da largura (ajustável) */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        outline: 1px solid black;
        border-radius: 5px;
        padding: 10px 0px;

        .graph-wrapper{
            height:250px;
        }
    }
    
</style>
