import { TAdjList, TVertex, TEdge, TPaths } from '../types'

const getEdge = (vx1: number, vx2: number, dgs: TEdge[]) => {
  dgs.find(
    (dg) =>
      (dg.vx1.id === vx1 && dg.vx2.id === vx2) ||
      (dg.vx1.id === vx2 && dg.vx2.id === vx1)
  )
}

const createPaths = (vxs: TVertex[], dgs: TEdge[], adj: TAdjList) => {
  const totalPaths = new Map<number, TPaths>()

  vxs.forEach((vx) => {
    const neighbors = adj.get(vx.id)!
    const itsPaths: TPaths = new Map<number, number>()

    neighbors.forEach((neighbor) => {
      const dg = getEdge(vx.id, neighbor, dgs)
      itsPaths.set(neighbor, dg)
    })

    totalPaths.set(vx.id, itsPaths)
  })

  totalPaths
}

export default createPaths
