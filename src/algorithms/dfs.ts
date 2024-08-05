import { TAdjList, TPaths } from '../types'
import StepTracker from './StepTracker'

const dfs = (startVx: number, adjList: TAdjList, paths: TPaths) => {
  const step = new StepTracker()
  step.add('Start DFS', 0, 'NoAction')

  const stack = [startVx]
  step.add(`Init stack with start vertex ${startVx}`, 1, 'Push', startVx)

  const visited = new Set<number>()
  step.add('Init empty set for visited vertices', 2, 'NoAction')

  let prevVx: number = 10000
  while (stack.length > 0) {
    step.add('Vertices still to visit, continue loop', 3, 'NoAction')

    const curVx = stack.pop()!
    step.add(`Pop vertex ${curVx} from stack`, 4, 'Pop', curVx, paths.get(prevVx)?.get(curVx))

    if (!visited.has(curVx)) {
      step.add(`Check if vertex ${curVx} visited`, 5, 'Check', curVx, paths.get(prevVx)?.get(curVx))

      visited.add(curVx)
      step.add(`Mark vertex ${curVx} as visited`, 6, 'Visit', curVx, paths.get(prevVx)?.get(curVx))

      prevVx = curVx

      const neighbors = adjList.get(curVx)!

      neighbors.forEach((neighbor) => {
        step.add(`Process neighbor ${neighbor} of vertex ${curVx}`, 7, 'NoAction')

        if (!visited.has(neighbor)) {
          step.add(`Check if neighbor ${neighbor} visited`, 8, 'Check', neighbor, paths.get(curVx)!.get(neighbor))

          stack.push(neighbor)
          step.add(`Push neighbor ${neighbor} to stack`, 9, 'Push', neighbor, paths.get(curVx)!.get(neighbor))
        } else {
          step.add(`Check if neighbor ${neighbor} visited`, 8, 'Check', neighbor, paths.get(curVx)!.get(neighbor))
          step.add(`Neighbor ${neighbor} already visited`, 8, 'Visit', neighbor, paths.get(curVx)!.get(neighbor))
        }
      })
    } else {
      step.add(`Check if vertex ${curVx} visited`, 5, 'Check', curVx, paths.get(prevVx)?.get(curVx))
      step.add(`Vertex ${curVx} already visited`, 5, 'Visit', curVx, paths.get(prevVx)?.get(curVx))
    }
  }

  step.add('Finish DFS', 14, 'NoAction')
  return step.getTotalSteps()
}

export default dfs
