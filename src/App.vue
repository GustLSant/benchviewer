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
      alert('Nenhum arquivo selecionado.');
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
  <!-- Input file com label dinâmico -->
  <div class="">
    <label>
      {{ fileLabel }}
      <input type="file" accept=".json" @change="handleFileSelection" style="display: none" />
    </label>
    <!-- Botão para confirmar o upload -->
    <button @click="confirmUpload" :disabled="!selectedFile">Confirmar Upload</button>
  </div>

  <!-- Lista dos Benchmarks carregados -->
  <h3>Benchmarks carregados:</h3>
  <ul>
    <li v-for="(b, index) in benchmarks" :key="index">
      {{ b.algorithm }} - {{ b.cpu }} - {{ b.performance.cpuTime }}s
    </li>
  </ul>
</template>


<style>
  #app{
    min-height: 100vh;
  }

  label {
    display: inline-block;
    padding: 8px 12px;
    background-color: #eee;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 8px 12px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>
