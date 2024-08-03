import StepTracker from './StepTracker'
import { TAdjList, TPaths } from '../types'

const bfs = (startVertexId: number, adjacencyList: TAdjList) => {
  const stepTracker = new StepTracker()
  stepTracker.add(
    'Starting Breadth-First Search (BFS) algorithm',
    0,
    'NoAction'
  )

  const verticesToVisit = [startVertexId]
  stepTracker.add(
    `Initialized the queue with the starting vertex ${startVertexId}`,
    1,
    'NoAction'
  )

  const visitedVertices = new Set<number>()
  stepTracker.add(
    'Initialized an empty set to keep track of visited vertices',
    2,
    'NoAction'
  )

  while (verticesToVisit.length > 0) {
    stepTracker.add(
      'There are still vertices to visit, continue the loop',
      3,
      'NoAction'
    )

    const currentVertexId = verticesToVisit.shift() as number
    stepTracker.add(
      `Dequeued vertex ${currentVertexId} for processing`,
      4,
      'NoAction'
    )

    let currentEdgeId = undefined
    if (!visitedVertices.has(currentVertexId)) {
      const prevStepId = stepTracker.getStepId() - 1
      const prevStep = stepTracker.get()[prevStepId]
      const prevVertexId = prevStep.vxId
      if (prevStepId >= 0) {
        const prevStepAdjacentVertices = adjacencyList.get(
          prevVertexId as number
        ) as TPaths[]
        const filteredAdjacentPaths = prevStepAdjacentVertices.filter(
          (neighbor) => neighbor.vertex.id === currentVertexId
        )
        const currentPath = filteredAdjacentPaths[0]
        currentEdgeId = currentPath.edge.id
      }
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5,
        'Check',
        currentVertexId,
        currentEdgeId
      )

      visitedVertices.add(currentVertexId)
      stepTracker.add(
        `Marked vertex ${currentVertexId} as visited`,
        6,
        'Visit',
        currentVertexId,
        currentEdgeId
      )

      const adjacentVertices = adjacencyList.get(currentVertexId) as TPaths[]

      adjacentVertices.forEach((neighbor) => {
        stepTracker.add(
          `Processing each adjacent vertex of the current vertex ${currentVertexId}. Now looking at vertex ${neighbor.vertex.id}`,
          7,
          'NoAction'
        )

        if (!visitedVertices.has(neighbor.vertex.id)) {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'Check',
            neighbor.vertex.id,
            neighbor.edge.id
          )
          verticesToVisit.push(neighbor.vertex.id)
          stepTracker.add(
            `Enqueued vertex ${neighbor.vertex.id} for future processing`,
            9,
            'NoAction'
          )
        } else {
          stepTracker.add(
            `Checking if vertex ${neighbor.vertex.id} has been visited`,
            8,
            'Check',
            neighbor.vertex.id,
            neighbor.edge.id
          )
        }
      })
    } else {
      stepTracker.add(
        `Checking if vertex ${currentVertexId} has been visited`,
        5,
        'Check',
        currentVertexId,
        currentEdgeId
      )
    }
  }

  stepTracker.add('Finished Breadth-First Search (BFS)', 14, 'NoAction')
  return stepTracker.get()
}

export default bfs
