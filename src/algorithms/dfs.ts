import StepTracker from './StepTracker'
import { TAdjList, TPath } from '../types'

const dfs = (startVertexId: number, adjacencyList: TAdjList) => {
  const stepTracker = new StepTracker()
  stepTracker.add('Starting Depth-First Search (DFS) algorithm', 0)

  const verticesToVisit = [startVertexId]
  stepTracker.add(
    `Initialized the stack with the starting vertex ${startVertexId}`,
    1
  )

  const visitedVertices = new Set<number>()
  stepTracker.add(
    'Initialized an empty set to keep track of visited vertices',
    2
  )

  while (verticesToVisit.length > 0) {
    stepTracker.add('There are still vertices to visit, continue the loop', 3)

    const currentVertexId = verticesToVisit.pop() as number
    stepTracker.add(
      `Popped vertex ${currentVertexId} from the stack for processing`,
      4
    )

    if (!visitedVertices.has(currentVertexId)) {
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5
      )

      visitedVertices.add(currentVertexId)
      stepTracker.add(
        `Marked vertex ${currentVertexId} as visited`,
        6,
        currentVertexId
      )

      const adjacentVertices = adjacencyList.get(currentVertexId) as TPath[]

      adjacentVertices.forEach((neighbor) => {
        stepTracker.add(
          `Processing each adjacent vertex of the current vertex ${currentVertexId}. Now looking at vertex ${neighbor.vertex.id}`,
          7
        )

        if (!visitedVertices.has(neighbor.vertex.id)) {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8
          )

          verticesToVisit.push(neighbor.vertex.id)
          stepTracker.add(
            `Pushed vertex ${neighbor.vertex.id} onto the stack for future processing`,
            9,
            neighbor.vertex.id,
            neighbor.edge.id
          )
        } else {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8
          )
        }
      })
    } else {
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5
      )
    }
  }

  stepTracker.add('Finished Depth-First Search (DFS)', 14)
  return stepTracker.get()
}

export default dfs
