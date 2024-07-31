import Tracker from './StepTracker'
import { TAdjList, TPath } from '../types'

const dfs = (startVxId: number, adjList: TAdjList) => {
  const tracker = new Tracker()
  tracker.add('Start DFS', 0, 'NoAction')

  const stack = [startVxId]
  tracker.add(`Init stack with start vertex ${startVxId}`, 1, 'Push', startVxId)

  const visited = new Set<number>()
  tracker.add('Init empty set for visited vertices', 2, 'NoAction')

  while (stack.length > 0) {
    tracker.add('Vertices still to visit, continue loop', 3, 'NoAction')

    const currVxId = stack.pop() as number

    let currDgId = undefined
    const prevStepId = tracker.getStepId() - 1

    const prevStep = tracker.get().find((step) => step.id === prevStepId)
    const prevVxId = prevStep?.vertexId
    if (prevVxId !== undefined) {
      const prevStepAdjVxs = adjList.get(prevVxId) as TPath[] | undefined
      if (prevStepAdjVxs) {
        const filterAdjPaths = prevStepAdjVxs.filter(
          (neighbor) => neighbor.vertex.id === currVxId
        )
        const currentPath = filterAdjPaths[0]
        if (currentPath && currentPath.edge) {
          currDgId = currentPath.edge.id
        }
      }
    }
    tracker.add(
      `Pop vertex ${currVxId} from stack`,
      4,
      'Pop',
      currVxId,
      currDgId
    )

    if (!visited.has(currVxId)) {
      const prevStepId = tracker.getStepId() - 1

      const prevStep = tracker.get().find((step) => step.id === prevStepId)
      const prevVxId = prevStep?.vertexId
      if (prevVxId !== undefined) {
        const prevStepAdjVxs = adjList.get(prevVxId) as TPath[] | undefined
        if (prevStepAdjVxs) {
          const filterAdjPaths = prevStepAdjVxs.filter(
            (neighbor) => neighbor.vertex.id === currVxId
          )
          const currentPath = filterAdjPaths[0]
          if (currentPath && currentPath.edge) {
            currDgId = currentPath.edge.id
          }
        }
      }
      tracker.add(
        `Check if vertex ${currVxId} visited`,
        5,
        'Check',
        currVxId,
        currDgId
      )

      visited.add(currVxId)
      tracker.add(
        `Mark vertex ${currVxId} as visited`,
        6,
        'Visit',
        currVxId,
        currDgId
      )

      const adjVxs = adjList.get(currVxId) as TPath[]

      adjVxs.forEach((neighbor) => {
        tracker.add(
          `Process neighbor ${neighbor.vertex.id} of vertex ${currVxId}`,
          7,
          'NoAction'
        )

        if (!visited.has(neighbor.vertex.id)) {
          tracker.add(
            `Check if neighbor ${neighbor.vertex.id} visited`,
            8,
            'Check',
            neighbor.vertex.id,
            neighbor.edge.id
          )
          stack.push(neighbor.vertex.id)
          tracker.add(
            `Push neighbor ${neighbor.vertex.id} to stack`,
            9,
            'Push',
            neighbor.vertex.id,
            neighbor.edge.id
          )
        } else {
          tracker.add(
            `Neighbor ${neighbor.vertex.id} already visited`,
            8,
            'Visit',
            neighbor.vertex.id,
            neighbor.edge.id
          )
        }
      })
    } else {
      tracker.add(
        `Vertex ${currVxId} already visited`,
        5,
        'Check',
        currVxId,
        currDgId
      )
    }
  }

  tracker.add('Finish DFS', 14, 'NoAction')
  return tracker.get()
}

export default dfs
