import IEdge from '../../interfaces/IEdge'

const isEdgeExists = (edge: IEdge, edges: IEdge[]) => {
  return edges.some(
    (existingEdge) =>
      (existingEdge.vertexOne.id === edge.vertexOne.id &&
        existingEdge.vertexTwo.id === edge.vertexTwo.id) ||
      (existingEdge.vertexOne.id === edge.vertexTwo.id &&
        existingEdge.vertexTwo.id === edge.vertexOne.id)
  )
}

const isLinkingToSelf = (edge: IEdge) => {
  return (
    edge.vertexOne.id === edge.vertexTwo.id &&
    edge.vertexOne.x === edge.vertexTwo.x &&
    edge.vertexOne.y === edge.vertexTwo.y
  )
}

const isNewEdgeValid = (newEdge: IEdge, edges: IEdge[]) => {
  return !isLinkingToSelf(newEdge) && !isEdgeExists(newEdge, edges)
}

export { isLinkingToSelf, isEdgeExists, isNewEdgeValid }
