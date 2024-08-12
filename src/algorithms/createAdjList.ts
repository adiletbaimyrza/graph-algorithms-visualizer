import TVertex from '../types/TVertex'
import TEdge from '../types/TEdge'
import TAdjList from '../types/TAdjList'
import TVxId from '../types/TVxId'

const isItsEdge = (vx: TVertex, dg: TEdge) => {
  return dg.vx1.id === vx.id || dg.vx2.id === vx.id
}

const getOpposVxId = (vx: TVertex, dg: TEdge) => {
  return dg.vx1.id === vx.id ? dg.vx2.id : dg.vx1.id
}

const createAdjList = (vxs: TVertex[], dgs: TEdge[]) => {
  const adj: TAdjList = new Map<TVxId, TVxId[]>()

  vxs.forEach((vx) => {
    const itsEdges: TEdge[] = dgs.filter((dg) => isItsEdge(vx, dg))

    const neighbors: TVxId[] = []

    itsEdges.forEach((itsEdge) => {
      neighbors.push(getOpposVxId(vx, itsEdge))
    })

    adj.set(vx.id, neighbors)
  })

  return adj
}

export default createAdjList
