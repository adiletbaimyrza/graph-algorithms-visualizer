import StepTracker from './StepTracker'
import { TAdjList, TPath } from '../types'

const bfs = (startVertexId: number, adjacencyList: TAdjList) => {
  const stepTracker = new StepTracker() // algorithm
  stepTracker.add(
    'Starting Breadth-First Search (BFS) algorithm',
    0,
    'NoActionOnGraph'
  )

  const verticesToVisit = [startVertexId] // algorithm
  stepTracker.add(
    `Initialized the queue with the starting vertex ${startVertexId}`,
    1,
    'NoActionOnGraph'
  )

  const visitedVertices = new Set<number>() // algorithm
  stepTracker.add(
    'Initialized an empty set to keep track of visited vertices',
    2,
    'NoActionOnGraph'
  )

  while (verticesToVisit.length > 0) {
    // algorithm
    stepTracker.add(
      'There are still vertices to visit, continue the loop',
      3,
      'NoActionOnGraph'
    )

    const currentVertexId = verticesToVisit.shift() as number // algorithm
    stepTracker.add(
      `Dequeued vertex ${currentVertexId} for processing`,
      4,
      'NoActionOnGraph'
    )

    let currentEdgeId = undefined
    if (!visitedVertices.has(currentVertexId)) {
      // algorithm

      const prevStepId = stepTracker.getStepId() - 1
      const prevStep = stepTracker.get()[prevStepId]
      const prevVertexId = prevStep.vertexId
      if (prevStepId >= 0) {
        const prevStepAdjacentVertices = adjacencyList.get(
          prevVertexId as number
        ) as TPath[]
        const filteredAdjacentPaths = prevStepAdjacentVertices.filter(
          (neighbor) => neighbor.vertex.id === currentVertexId
        )
        const currentPath = filteredAdjacentPaths[0]
        currentEdgeId = currentPath.edge.id
      }
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5,
        'toBeLooked',
        currentVertexId,
        currentEdgeId
      )

      visitedVertices.add(currentVertexId) // algorithm
      stepTracker.add(
        `Marked vertex ${currentVertexId} as visited`,
        6,
        'toBeVisited',
        currentVertexId,
        currentEdgeId
      )

      const adjacentVertices = adjacencyList.get(currentVertexId) as TPath[] // algorithm

      adjacentVertices.forEach((neighbor) => {
        // algorithm
        stepTracker.add(
          `Processing each adjacent vertex of the current vertex ${currentVertexId}. Now looking at vertex ${neighbor.vertex.id}`,
          7,
          'NoActionOnGraph'
        )

        if (!visitedVertices.has(neighbor.vertex.id)) {
          // algorithm
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'toBeLooked',
            neighbor.vertex.id,
            neighbor.edge.id
          )
          verticesToVisit.push(neighbor.vertex.id) // algorithm
          stepTracker.add(
            `Enqueued vertex ${neighbor.vertex.id} for future processing`,
            9,
            'NoActionOnGraph'
          )
        } else {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'toBeLooked',
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

  stepTracker.add('Finished Breadth-First Search (BFS)', 14, 'NoActionOnGraph')
  return stepTracker.get()
}

export default bfs
