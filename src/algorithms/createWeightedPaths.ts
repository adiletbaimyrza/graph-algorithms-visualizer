import {
  TVertex,
  TEdge,
  TAdjacencyList,
  TWeightedPaths,
  TVertexID,
} from '../types'

const getDgWithWeight = (vx1: TVertexID, vx2: TVertexID, dgs: TEdge[]) => {
  const dg = dgs.find(
    (dg) =>
      (dg.vx1.id === vx1 && dg.vx2.id === vx2) ||
      (dg.vx1.id === vx2 && dg.vx2.id === vx1)
  )!

  return [dg.id!, dg.weight!]
}

const createWeightPaths = (
  vxs: TVertex[],
  dgs: TEdge[],
  adj: TAdjacencyList
): TWeightedPaths => {
  const totalPaths = new Map<TVertexID, Map<TVertexID, number[]>>()

  vxs.forEach((vx) => {
    const neighbors = adj.get(vx.id)!
    const itsPaths = new Map<TVertexID, number[]>()

    neighbors.forEach((neighbor) => {
      const dg = getDgWithWeight(vx.id, neighbor, dgs)
      itsPaths.set(neighbor, dg)
    })

    totalPaths.set(vx.id, itsPaths)
  })

  return totalPaths
}

export default createWeightPaths
