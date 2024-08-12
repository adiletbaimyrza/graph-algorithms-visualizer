import { TVertex, TEdge, TAdjacencyList, TVertexID } from '../types'

export default class AdjacencyList {
  private adjacencyList: TAdjacencyList

  constructor(vertices: TVertex[], edges: TEdge[]) {
    this.adjacencyList = new Map<TVertexID, TVertexID[]>()

    vertices.forEach((vertex) => {
      const itsEdges: TEdge[] = edges.filter((edge) =>
        this.isItsEdge(vertex, edge)
      )

      const neighbors: TVertexID[] = []

      itsEdges.forEach((itsEdge) => {
        neighbors.push(this.getOpposVxId(vertex, itsEdge))
      })

      this.adjacencyList.set(vertex.id, neighbors)
    })
  }

  private isItsEdge(vx: TVertex, dg: TEdge) {
    return dg.vx1.id === vx.id || dg.vx2.id === vx.id
  }

  private getOpposVxId(vx: TVertex, dg: TEdge) {
    return dg.vx1.id === vx.id ? dg.vx2.id : dg.vx1.id
  }

  public get() {
    return this.adjacencyList
  }
}
