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