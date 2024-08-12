import MinHeap from './MinHeap'
import StepTracker from './StepTracker'
import { TAdjacencyList, TVertexID, TWeightedPaths, TWeight } from '../types'

const prim = (
  startVx: TVertexID,
  adjList: TAdjacencyList,
  paths: TWeightedPaths
) => {
  const step = new StepTracker()
  step.add("Start Prim's algorithm", 0, 'NoAction')

  const minHeap = new MinHeap<[TVertexID, TVertexID, TWeight]>((a, b) =>
    a[2] < b[2] ? -1 : 0
  )
  step.add('Initialize min-heap', 1, 'NoAction')

  const visited = new Set<TVertexID>()
  step.add('Init empty set for visited vertices', 2, 'NoAction')

  visited.add(startVx)
  step.add(`Add start vertex ${startVx} to visited`, 3, 'Visit', startVx)

  const neighbors = adjList.get(startVx)
  neighbors!.forEach((neighbor) => {
    step.add(
      `Iterate if neighbors of start vertex ${startVx}. Current: ${neighbor}`,
      4,
      'NoAction'
    )

    const [dg, weight] = paths.get(startVx)!.get(neighbor)!

    minHeap.insert([startVx, neighbor, weight])
    step.add(
      `Insert edge (${startVx}, ${neighbor}) with weight ${weight} into min-heap`,
      5,
      'Push',
      neighbor,
      dg
    )
  })
  step.add(`Iterate if neighbors of start vertex ${startVx}`, 4, 'NoAction')
  step.add('No neighbors left. Exit For loop', 6, 'NoAction')

  while (minHeap.size() > 0) {
    step.add('If edges in min-heap, continue loop', 7, 'NoAction')

    const [from, to, weight] = minHeap.extractMin()
    const [dg] = paths.get(from)!.get(to)!
    step.add(
      `Extract min-weight ${weight} edge from min-heap`,
      8,
      'Pop',
      to,
      dg
    )

    if (!visited.has(to)) {
      step.add(`Check if vertex ${to} is visited`, 9, 'Check', to, dg)

      visited.add(to)
      step.add(
        `Add edge (${from}, ${to}) with weight ${weight} to MST`,
        10,
        'Visit',
        to,
        paths.get(from)?.get(to)![0]
      )

      const neighbors = adjList.get(to)
      neighbors!.forEach((neighbor) => {
        step.add(
          `Iterate if neighbors of vertex ${to}. Current: ${neighbor}`,
          11,
          'NoAction'
        )
        const [dg, weight] = paths.get(to)!.get(neighbor)!
        if (!visited.has(neighbor)) {
          step.add(
            `Check if neighbor ${neighbor} is visited`,
            12,
            'Check',
            neighbor,
            dg
          )

          minHeap.insert([to, neighbor, weight])
          step.add(
            `Insert edge (${to}, ${neighbor}) with weight ${weight} into min-heap`,
            13,
            'Push',
            neighbor,
            dg
          )
        } else {
          step.add(`Check if ${neighbor} is visited`, 12, 'Check', neighbor, dg)
          step.add(
            `Neighbor ${neighbor} is already visited`,
            14,
            'Reverse',
            neighbor,
            dg
          )
        }
      })
      step.add(`Iterate if neighbors of vertex ${to}`, 11, 'NoAction')
      step.add('No neighbors left. Exit For loop', 15, 'NoAction')
    } else {
      step.add(
        `Extract min-weight ${weight} edge from min-heap`,
        8,
        'Reverse',
        to,
        dg
      )
      step.add(`Check if vertex ${to} is visited`, 9, 'Check', to, dg)
      step.add(`Vertex ${to} is already visited`, 16, 'Reverse', to, dg)
    }
  }
  step.add('If edges in min-heap, continue loop', 7, 'NoAction')
  step.add('No vertices left in min-heap. Exit While loop', 17, 'NoAction')

  step.add("Finish Prim's algorithm", 18, 'NoAction')
  return step.getTotalSteps()
}

export default prim
