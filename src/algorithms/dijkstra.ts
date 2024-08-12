import MinHeap from './MinHeap'
import StepTracker from './StepTracker'
import { TVxId, TVertex, TAdjList, TWeightPaths, TWeight } from '../types'

const dijkstra = (
  startVx: TVxId,
  vxs: TVertex[],
  adj: TAdjList,
  paths: TWeightPaths
) => {
  const step = new StepTracker()
  step.add("Start Dijkstra's algorithm", 0, 'NoAction')

  const distances = new Map<TVxId, TWeight>()
  step.add('Init empty map for distances', 1, 'NoAction')

  const previous = new Map<TVxId, TVxId>()
  step.add('Init empty map for previous vertices', 2, 'NoAction')

  const visited = new Set<TVxId>()
  step.add('Init empty set for visited vertices', 3, 'NoAction')

  const minHeap = new MinHeap<[TVxId, TWeight]>((a, b) =>
    a[1] < b[1] ? -1 : 0
  )
  step.add('Init min-heap', 4, 'NoAction')

  for (const vx of vxs) {
    step.add(`Iterate over vertices. Current: ${vx.id}`, 5, 'NoAction')

    if (vx.id === startVx) {
      step.add('Check if vertex equals start vertex', 6, 'NoAction')

      distances.set(vx.id, 0)
      step.add(`Set distance of vertex ${vx.id} to 0`, 7, 'NoAction')

      minHeap.insert([vx.id, 0])
      step.add(
        `Insert start vertex ${vx.id} with distance 0 into min-heap`,
        8,
        'Push',
        vx.id
      )
    } else {
      step.add('Check if vertex equals start vertex', 6, 'NoAction')
      step.add("Vertex doesn't equal to start vertex", 9, 'NoAction')

      distances.set(vx.id, Infinity)
      step.add(
        `Insert vertex ${vx.id} with distance Infinity into min-heap`,
        10,
        'Push',
        vx.id
      )
    }
  }
  step.add('Finish iterating over vertices', 12, 'NoAction')

  while (minHeap.size() > 0) {
    step.add('Min-heap not empty, continue loop', 13, 'NoAction')

    const curVx: [TVxId, TWeight] = minHeap.extractMin()

    if (curVx[0] === startVx) {
      step.add(
        `Extract vertex ${curVx[0]} with distance ${curVx[1]} from min-heap`,
        14,
        'Pop',
        curVx[0]
      )
    } else {
      step.add(
        `Extract vertex ${curVx[0]} with distance ${curVx[1]} from min-heap`,
        14,
        'Pop',
        curVx[0],
        paths.get(previous.get(curVx[0])!)?.get(curVx[0])![0]
      )
    }

    visited.add(curVx[0])
    step.add(
      `Mark ${curVx[0]} as visited`,
      15,
      'Visit',
      curVx[0],
      paths.get(previous.get(curVx[0])!)?.get(curVx[0])![0]
    )

    const neighbors = adj.get(curVx[0])!

    for (const neighbor of neighbors) {
      step.add(
        `Iterate over neighbors ${neighbor} of vertex ${curVx[0]}`,
        16,
        'NoAction'
      )

      if (!visited.has(neighbor)) {
        step.add(
          `Check if neighbor wasn't visited`,
          17,
          'Check',
          neighbor,
          paths.get(curVx[0])!.get(neighbor)![0]
        )

        const newDist =
          distances.get(curVx[0])! + paths.get(curVx[0])!.get(neighbor)![1]
        step.add(
          `Calculate new distance for vertex ${neighbor}. New dist: ${distances.get(
            curVx[0]
          )!} + ${paths.get(curVx[0])!.get(neighbor)![1]}`,
          18,
          'NoAction'
        )

        if (newDist < distances.get(neighbor)!) {
          step.add(
            `Check if new distance ${newDist} is less than current distance ${distances.get(
              neighbor
            )!}`,
            19,
            'Check',
            neighbor,
            paths.get(curVx[0])!.get(neighbor)![0]
          )

          distances.set(neighbor, newDist)
          step.add(
            `New distance is less. Update distance of vertex ${neighbor} to ${newDist}`,
            20,
            'Reverse',
            neighbor,
            paths.get(curVx[0])!.get(neighbor)![0]
          )

          previous.set(neighbor, curVx[0])
          step.add(
            `Set previous vertex of ${neighbor} to ${curVx[0]}`,
            21,
            'NoAction'
          )

          minHeap.insert([neighbor, newDist])
          step.add(
            `Insert vertex ${neighbor} with updated distance ${newDist} into min-heap`,
            22,
            'Push',
            neighbor,
            paths.get(curVx[0])!.get(neighbor)![0]
          )
        } else {
          step.add(
            `Check if new distance ${newDist} is less than current distance ${distances.get(
              neighbor
            )!}`,
            19,
            'Check',
            neighbor,
            paths.get(curVx[0])!.get(neighbor)![0]
          )

          step.add(
            `New distance ${newDist} is more than current distance ${distances.get(
              neighbor
            )!}`,
            23,
            'Reverse',
            neighbor,
            paths.get(curVx[0])!.get(neighbor)![0]
          )
        }
      } else {
        step.add(
          `Check if neighbor wasn't visited`,
          17,
          'Check',
          neighbor,
          paths.get(curVx[0])!.get(neighbor)![0]
        )
        step.add(
          `Vertex ${neighbor} is already visited. Skip`,
          24,
          'Reverse',
          neighbor,
          paths.get(curVx[0])!.get(neighbor)![0]
        )
      }
    }
  }

  step.add('Finish Dijkstra', 20, 'NoAction')
  return step.getTotalSteps()
}

export default dijkstra
