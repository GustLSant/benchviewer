<script setup lang="ts">
  import { ref } from 'vue';
  import type { Benchmark } from './types';

  const benchmarks = ref<Benchmark[]>([]);
  const selectedFile = ref<File | null>(null);
  const fileLabel = ref<string>('Escolher arquivo JSON');


  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        selectedFile.value = file;
        fileLabel.value = file.name;
    } else {
        selectedFile.value = null;
        fileLabel.value = 'Escolher arquivo JSON';
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
        } else {
          benchmarks.value.push(json as Benchmark);
        }

        console.log('Benchmarks adicionados:', benchmarks.value);

        // Resetar seleção após upload
        selectedFile.value = null;
        fileLabel.value = 'Escolher arquivo JSON';
      } catch (error) {
        console.error('Erro ao processar o JSON:', error);
        alert('Erro ao ler o arquivo JSON.');
      }
    };

    reader.readAsText(selectedFile.value);
  };

</script>


<template>
  <div class="flex gap-2">
    <label class="flex items-center text-sm px-4 rounded-sm bg-neutral-700 hover:cursor-pointer hover:underline">
      {{ fileLabel }}
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
</template>


<style>

</style>
