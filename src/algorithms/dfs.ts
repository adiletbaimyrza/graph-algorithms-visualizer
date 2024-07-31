import StepTracker from './StepTracker'
import { TAdjList, TPath } from '../types'

const dfs = (startVertexId: number, adjacencyList: TAdjList) => {
  const stepTracker = new StepTracker()
  stepTracker.add(
    'Starting Depth-First Search (DFS) algorithm',
    0,
    'NoActionOnGraph'
  )

  const verticesToVisit = [startVertexId]
  stepTracker.add(
    `Initialized the stack with the starting vertex ${startVertexId}`,
    1,
    'NoActionOnGraph'
  )

  const visitedVertices = new Set<number>()
  stepTracker.add(
    'Initialized an empty set to keep track of visited vertices',
    2,
    'NoActionOnGraph'
  )

  while (verticesToVisit.length > 0) {
    stepTracker.add(
      'There are still vertices to visit, continue the loop',
      3,
      'NoActionOnGraph'
    )

    const currentVertexId = verticesToVisit.pop() as number // number
    stepTracker.add(
      `Popped vertex ${currentVertexId} from the stack for processing`,
      4,
      'NoActionOnGraph'
    )

    let currentEdgeId = undefined
    if (!visitedVertices.has(currentVertexId)) {
      const prevStepId = stepTracker.getStepId() - 1

      const prevStep = stepTracker.get().find((step) => step.id === prevStepId)
      const prevVertexId = prevStep?.vertexId
      if (prevVertexId) {
        const prevStepAdjacentVertices = adjacencyList.get(
          prevVertexId as number
        ) as TPath[]
        const filteredAdjacentPaths = prevStepAdjacentVertices.filter(
          (neighbor) => neighbor.vertex.id === currentVertexId
        )
        const currentPath = filteredAdjacentPaths[0]
        currentEdgeId = currentPath.edge.id
        console.log(currentEdgeId)
      }
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5,
        'toBeLooked',
        currentVertexId,
        currentEdgeId
      )

      visitedVertices.add(currentVertexId)
      stepTracker.add(
        `Marked vertex ${currentVertexId} as visited`,
        6,
        'toBeVisited',
        currentVertexId,
        currentEdgeId
      )

      const adjacentVertices = adjacencyList.get(currentVertexId) as TPath[]

      adjacentVertices.forEach((neighbor) => {
        stepTracker.add(
          `Processing each adjacent vertex of the current vertex ${currentVertexId}. Now looking at vertex ${neighbor.vertex.id}`,
          7,
          'NoActionOnGraph'
        )

        if (!visitedVertices.has(neighbor.vertex.id)) {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'toBeLooked',
            neighbor.vertex.id,
            neighbor.edge.id
          )
          verticesToVisit.push(neighbor.vertex.id)
          stepTracker.add(
            `Pushed vertex ${neighbor.vertex.id} onto the stack for future processing`,
            9,
            'toBeChosen',
            neighbor.vertex.id,
            neighbor.edge.id
          )
        } else {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'toBeVisited',
            neighbor.vertex.id,
            neighbor.edge.id
          )
        }
      })
    } else {
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5,
        'toBeLooked',
        currentVertexId,
        currentEdgeId
      )
    }
  }

  stepTracker.add('Finished Depth-First Search (DFS)', 14, 'NoActionOnGraph')
  return stepTracker.get()
}

export default dfs
