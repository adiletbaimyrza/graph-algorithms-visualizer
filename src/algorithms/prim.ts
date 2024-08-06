import StepTracker from './StepTracker'
import MinHeap from './MinHeap'
import { TAdjList, TWeightPaths } from '../types'

const prim = (startVx: number, adjList: TAdjList, paths: TWeightPaths) => {
  const minHeap = new MinHeap()

  const visited = new Set<number>()
  const mst = new Set<number>()

  while(minHeap)
}

export default prim
