export type BenchmarkMetric = "CPU Time" | "Total Time" | "CPU Max Usage" | "CPU Average Usage" | "Memory Max Usage" | "Memory Average Usage"


export type Benchmark = {
  algorithm: string,
  device: string,
  cpu: string,
  cpuClockSpeed: number,
  cpuThreadsCount: number,
  memory: string,
  memoryDdr: number,
  performance: BenchmarkPerformanceData,
}

export type BenchmarkPerformanceData = {
  totalTime: number,
  cpuTime: number,
  cpuMaxUsage: number,
  cpuAverageUsage: number,
  memoryMaxUsage: number,
  memoryAverageUsage: number,
}


export type BenchmarkGroupedByAlgorithm = {
  algorithm: string,
  benchmarks: Benchmark[]
};


export type GraphCollection = {
  algorithm: string,
  timeGraphData: GraphData | null,
  cpuGraphData: GraphData | null,
  memoryGraphData: GraphData | null
}


export type GraphData = {
  title: string,
  yAxisLabel: string,
  labes: string[],          // os labels sao os items do eixo X
  datasets: GraphDataset[]  // cada label pode ter várias colunas, a quantidade de colunas é definida pela quantidade de datasets
}


export type GraphDataset = {
  label: string, // esse label define o nome do dataset (no tooltip ao passar o mouse em cima)
  data: number[],
  backgroundColor: string
}


/*
  Os datasets são os valores das colunas dos labels.
  Como cada label pode possuir mais de um dataset (pois pode possuir mais de uma coluna), o IDX do dataset representa a ordem
  da coluna.
  O primeiro dataset possui todos os valores de todas as primeiras colunas dos labels do grafico
  O segundo dataset possui todos os valores de todas as segundas colunas dos labels do grafico



*/