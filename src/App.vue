<script setup lang="ts">
  import { ref } from 'vue';
  import type { Benchmark, GroupedBenchmarks } from './types';
  import GraphViewer from './components/GraphViewer.vue';

  const benchmarks = ref<Benchmark[]>([]); // lista completa dos benchmarks
  const groupedBenchmarks = ref<GroupedBenchmarks>({}); // lista dos benchmarks agrupados por cada algoritmo
  
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

        if (Array.isArray(json)) {
          json.forEach(item => benchmarks.value.push(item as Benchmark));
          updateGroupedBenchmarks();
        }
        else {
          benchmarks.value.push(json as Benchmark);
          updateGroupedBenchmarks();
        }

        console.log('Benchmarks adicionados:', benchmarks.value);
        selectedFile.value = null; // Resetar seleção após upload
      }
      catch (error) {
        console.error('Erro ao processar o JSON:', error);
        alert('Erro ao ler o arquivo JSON.');
      }
    };

    reader.readAsText(selectedFile.value);
  };


  const updateGroupedBenchmarks = () => {
    benchmarks.value.forEach(benchmark => {
      if(benchmark.algorithm in groupedBenchmarks.value){ // esse algoritmo ja existe no groupedBenchmarks
        groupedBenchmarks.value[benchmark.algorithm].push(benchmark);
      }
      else{
        groupedBenchmarks.value[benchmark.algorithm] = [benchmark];
      }
    });
  }
</script>


<template>
  <div class="flex gap-2">
    <label class="flex items-center text-sm px-4 rounded-sm bg-neutral-700 hover:cursor-pointer hover:underline">
      {{ (selectedFile !== null) ? selectedFile.name : "Escolher arquivo JSON" }}
      <input type="file" accept=".json" @change="handleFileSelection" style="display: none" />
    </label>

    <button @click="confirmUpload" :class="(selectedFile) ? 'enabled': 'disabled'">
      {{ (selectedFile) ? 'Carregar Arquivo': 'Nenhum Arquivo Selecionado' }}
    </button>
  </div>

  <div class="flex flex-col gap-2 items-center">
    <h3>Benchmarks carregados:</h3>
    <ul>
      <li v-for="(b, index) in benchmarks" :key="index">
        {{ b.algorithm }} - {{ b.cpu }} - {{ b.performance.cpuTime }}s
      </li>
    </ul>
  </div>
  
  <div>
    <GraphViewer v-for="(b, idx) in benchmarks" :key="idx" :benchmarkData="b" />
  </div>

  <p @click="console.log(groupedBenchmarks)">print grouped benchmarks</p>
</template>


<style>

</style>
