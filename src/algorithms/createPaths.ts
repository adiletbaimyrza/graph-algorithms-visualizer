import TVertex from '../types/TVertex'
import TEdge from '../types/TEdge'
import TAdjList from '../types/TAdjList'
import TPaths from '../types/TPaths'
import TVxId from '../types/TVxId'
import TDgId from '../types/TDgId'

const getEdge = (vx1: TVxId, vx2: TVxId, dgs: TEdge[]) => {
  const dg = dgs.find(
    (dg) =>
      (dg.vx1.id === vx1 && dg.vx2.id === vx2) ||
      (dg.vx1.id === vx2 && dg.vx2.id === vx1)
  )!

  return dg.id
}

const createPaths = (vxs: TVertex[], dgs: TEdge[], adj: TAdjList): TPaths => {
  const totalPaths = new Map<TVxId, Map<TVxId, TDgId>>()

  vxs.forEach((vx) => {
    const neighbors = adj.get(vx.id)!
    const itsPaths = new Map<TVxId, number>()

    neighbors.forEach((neighbor) => {
      const dg = getEdge(vx.id, neighbor, dgs)
      itsPaths.set(neighbor, dg)
    })

    totalPaths.set(vx.id, itsPaths)
  })

  return totalPaths
}

export default createPaths
