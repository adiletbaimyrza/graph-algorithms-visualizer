import MinHeap from './MinHeap'
import StepTracker from './StepTracker'
import { TAdjList, TWeightPaths, TVxId } from '../types'

const prim = (startVx: number, adjList: TAdjList, paths: TWeightPaths) => {
  const step = new StepTracker()
  step.add("Start Prim's algorithm", 0, 'NoAction')

  const minHeap = new MinHeap()
  step.add('Initialize min-heap', 1, 'NoAction')

  const visited = new Set<TVxId>()
  step.add('Init empty set for visited vertices', 2, 'NoAction')

  visited.add(startVx)
  step.add(`Add start vertex ${startVx} to visited`, 3, 'Visit', startVx)

  const neighbors = adjList.get(startVx)
  neighbors!.forEach((neighbor) => {
    step.add(`Iterate over neighbors: current vertex ${neighbor}`, 4, 'NoAction')

    const [dg, weight] = paths.get(startVx)!.get(neighbor)!

    minHeap.insert([startVx, neighbor, weight])
    step.add(`Insert edge (${startVx}, ${neighbor}) with weight ${weight} into min-heap`, 5, 'Push', neighbor, dg)
  })
  step.add('Exit loop', 6, 'NoAction')

  while (minHeap.size() > 0) {
    step.add('Vertices still , continue loop', 7, 'NoAction')

    const [from, to, weight] = minHeap.extractMin()
    const [dg, weig] = paths.get(from)!.get(to)!
    step.add(`Extract min-weight ${weight} edge from min-heap`, 8, 'Pop', to, dg)

    if (!visited.has(to)) {
      visited.add(to)

      step.add(`Add edge (${from}, ${to}) with weight ${weight} to MST`, 9, 'Visit', to, paths.get(from)?.get(to)![0])

      const neighbors = adjList.get(to)
      neighbors!.forEach((neighbor) => {
        step.add(`Iterate over neighbors: current vertex ${neighbor}`, 10, 'NoAction')
        const [dg, weight] = paths.get(to)!.get(neighbor)!
        if (!visited.has(neighbor)) {
          step.add(`Check if ${neighbor} is visited`, 11, 'Check', neighbor, dg)

          minHeap.insert([to, neighbor, weight])
          step.add(`Insert edge (${to}, ${neighbor}) with weight ${weight} into min-heap`, 12, 'Push', neighbor, dg)
        } else {
          step.add(`Check if ${neighbor} is visited`, 11, 'Check', neighbor, dg)
          step.add('already visited', 13, 'Reverse', neighbor, dg)
        }
      })
      step.add('Exit loop', 14, 'NoAction')
    }
  }

  step.add("Finish Prim's algorithm", 12, 'NoAction')
  return step.getTotalSteps()
}

export default prim
