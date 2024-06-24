import { TEdge } from '../../types'

const isEdgeExists = (edge: TEdge, edges: TEdge[]) => {
  return edges.some(
    (existingEdge) =>
      (existingEdge.vertexOne.id === edge.vertexOne.id &&
        existingEdge.vertexTwo.id === edge.vertexTwo.id) ||
      (existingEdge.vertexOne.id === edge.vertexTwo.id &&
        existingEdge.vertexTwo.id === edge.vertexOne.id)
  )
}

const isLinkingToSelf = (edge: TEdge) => {
  return (
    edge.vertexOne.id === edge.vertexTwo.id &&
    edge.vertexOne.x === edge.vertexTwo.x &&
    edge.vertexOne.y === edge.vertexTwo.y
  )
}

const isNewEdgeValid = (newEdge: TEdge, edges: TEdge[]) => {
  return !isLinkingToSelf(newEdge) && !isEdgeExists(newEdge, edges)
}

export { isLinkingToSelf, isEdgeExists, isNewEdgeValid }
