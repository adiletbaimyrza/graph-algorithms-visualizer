import { TAdjList, TVertex, TEdge, TPath } from '../types'

const isItsEdge = (vx: TVertex, dg: TEdge) => {
  return dg.vertexOne.id === vx.id || dg.vertexTwo.id === vx.id
}

const getOppositeVx = (vx: TVertex, edge: TEdge): TVertex => {
  return edge.vertexOne.id === vx.id ? edge.vertexTwo : edge.vertexOne
}

const createAdjList = (vertices: TVertex[], edges: TEdge[]) => {
  const adjList: TAdjList = new Map<number, TPath[]>()

  vertices.forEach((vx) => {
    const itsEdges: TEdge[] = edges.filter((dg) => isItsEdge(vx, dg))

    const paths: TPath[] = []

    itsEdges.forEach((itsEdge) => {
      paths.push({
        edge: itsEdge,
        vertex: getOppositeVx(vx, itsEdge),
      })
    })

    adjList.set(vx.id, paths)
  })

  return adjList
}

export default createAdjList
