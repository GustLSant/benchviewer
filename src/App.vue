<script setup lang="ts">
  import { ref } from 'vue';
  import type { Benchmark, BenchmarkGroupedByAlgorithm } from './types';
  import GraphViewer from './components/GraphViewer.vue';

  const benchmarks = ref<Benchmark[]>([]); // lista completa dos benchmarks  
  const selectedFile = ref<File | null>(null);


  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      selectedFile.value = file;
    } else {
      selectedFile.value = null;
    }
  };

  const confirmUpload = () => {
    if (!selectedFile.value) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);

        if (Array.isArray(json)) { json.forEach(item => benchmarks.value.push(item as Benchmark)); }
        else { benchmarks.value.push(json as Benchmark); }

        selectedFile.value = null; // Resetar seleção após upload
      }
      catch (error) {
        console.error('Erro ao processar o JSON:', error);
        alert('Erro ao ler o arquivo JSON.');
      }
    };

    reader.readAsText(selectedFile.value);
  };


  function getBenchmarksGroupedByAlgorithm(): BenchmarkGroupedByAlgorithm[] {
    const groupedBenchmarks: BenchmarkGroupedByAlgorithm[] = [];

    benchmarks.value.forEach(benchmark => {
      const idx: number = groupedBenchmarks.findIndex((b: BenchmarkGroupedByAlgorithm) => b.algorithm === benchmark.algorithm);
      
      if(idx !== -1){ // esse algoritmo ja existe no groupedBenchmarks (entao so adiciona na lista de benchmarks)
        groupedBenchmarks[idx].benchmarks.push(benchmark);
      }
      else{ // esse algoritmo nao existe no groupedBenchmarks (entao cria um novo objeto do tipo BenchmarkGroupedByAlgorithm e adiciona no array)
        groupedBenchmarks.push(
          {
            algorithm: benchmark.algorithm,
            benchmarks: [benchmark]
          }
        )
      }
    });

    return groupedBenchmarks;
  }
</script>


<template>
  <section class="flex justify-center gap-2">
    <label class="flex items-center text-sm px-4 rounded-sm bg-neutral-700 hover:cursor-pointer hover:underline">
      {{ (selectedFile !== null) ? selectedFile.name : "Escolher arquivo JSON" }}
      <input type="file" accept=".json" @change="handleFileSelection" style="display: none" />
    </label>

    <button @click="confirmUpload" :class="(selectedFile) ? 'enabled': 'disabled'">
      {{ (selectedFile) ? 'Carregar Arquivo': 'Nenhum Arquivo Selecionado' }}
    </button>
  </section>

  <section class="flex flex-col gap-2 items-center">
    <h3>Benchmarks carregados:</h3>
    <ul class="list-disc">
      <li v-for="(b, index) in benchmarks" :key="index">
        {{ b.algorithm }} - {{ b.cpu }} - {{ b.performance.cpuTime }}s
      </li>
    </ul>
  </section>
  
  <GraphViewer v-if="Object.keys(benchmarks).length > 0" :groupedBenchmarks="getBenchmarksGroupedByAlgorithm()" />
</template>


<style>

</style>
