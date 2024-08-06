import { TAdjList, TVertex, TEdge, TWeightPaths } from '../types'

const getDgWithWeight = (vx1: number, vx2: number, dgs: TEdge[]) => {
  const dg = dgs.find(
    (dg) =>
      (dg.vx1.id === vx1 && dg.vx2.id === vx2) ||
      (dg.vx1.id === vx2 && dg.vx2.id === vx1)
  )!

  return [dg.id!, dg.weight!]
}

const createPaths = (
  vxs: TVertex[],
  dgs: TEdge[],
  adj: TAdjList
): TWeightPaths => {
  const totalPaths = new Map<number, Map<number, number[]>>()

  vxs.forEach((vx) => {
    const neighbors = adj.get(vx.id)!
    const itsPaths = new Map<number, number[]>()

    neighbors.forEach((neighbor) => {
      const dg = getDgWithWeight(vx.id, neighbor, dgs)
      itsPaths.set(neighbor, dg)
    })

    totalPaths.set(vx.id, itsPaths)
  })

  return totalPaths
}

export default createPaths
