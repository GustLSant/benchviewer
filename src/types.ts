export type BenchmarkMetric = "DEFAULT" | "CPU Time" | "Total Time" | "CPU Max Usage" | "CPU Average Usage" | "Memory Max Usage" | "Memory Average Usage"


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
  cpuTime: number,
  totalTime: number,
  cpuMaxUsage: number,
  cpuAverageUsage: number,
  memoryMaxUsage: number,
  memoryAverageUsage: number,
}


export type GroupedBenchmarks = {
  [algorithmName: string]: Benchmark[];
};


export type GraphData = {
  title: string,
  algorithm: string,
  metric: BenchmarkMetric,
  data: { [device: string]: number }[]
}