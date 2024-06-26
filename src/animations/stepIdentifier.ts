import { TStep } from '../types'

const stepIdentifier = (step: TStep) => {
  const addToAdjacents =
    step.vertexId !== undefined && step.edgeId !== undefined

  const checkAdjacentIfVisited =
    step.vertexId === undefined && step.edgeId !== undefined

  const addVertexToVisited =
    step.vertexId !== undefined &&
    step.edgeId === undefined &&
    step.isVisited === undefined

  const checkVertexIfVisited =
    step.vertexId !== undefined &&
    step.edgeId === undefined &&
    step.isVisited === true

  return {
    addToAdjacents,
    checkAdjacentIfVisited,
    addVertexToVisited,
    checkVertexIfVisited,
  }
}

export default stepIdentifier
