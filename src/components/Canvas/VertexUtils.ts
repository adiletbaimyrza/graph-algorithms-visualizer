import TEdge from '../../types/TEdge'

const isEdgeExists = (edge: TEdge, edges: TEdge[]) => {
  return edges.some(
    (existingEdge) =>
      (existingEdge.vx1.id === edge.vx1.id &&
        existingEdge.vx2.id === edge.vx2.id) ||
      (existingEdge.vx1.id === edge.vx2.id &&
        existingEdge.vx2.id === edge.vx1.id)
  )
}

const isLinkingToSelf = (edge: TEdge) => {
  return (
    edge.vx1.id === edge.vx2.id &&
    edge.vx1.x === edge.vx2.x &&
    edge.vx1.y === edge.vx2.y
  )
}

const isNewEdgeValid = (newEdge: TEdge, edges: TEdge[]) => {
  return !isLinkingToSelf(newEdge) && !isEdgeExists(newEdge, edges)
}

const getRandWeight = (range: number) => {
  return Math.floor(Math.random() * range)
}

export { isLinkingToSelf, isEdgeExists, isNewEdgeValid, getRandWeight }
