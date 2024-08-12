import {
  TVertex,
  TEdge,
  TAdjacencyList,
  TPaths,
  TVertexID,
  TEdgeID,
} from '../types'

export default class Paths {
  private paths: TPaths

  constructor(vertices: TVertex[], edges: TEdge[], adj: TAdjacencyList) {
    this.paths = new Map<TVertexID, Map<TVertexID, TEdgeID>>()

    vertices.forEach((vertex) => {
      const neighbors = adj.get(vertex.id)!
      const itsPaths = new Map<TVertexID, TEdgeID>()

      neighbors.forEach((neighbor) => {
        const edge = this.getEdge(vertex.id, neighbor, edges)
        itsPaths.set(neighbor, edge)
      })

      this.paths.set(vertex.id, itsPaths)
    })
  }

  private getEdge(vx1: TVertexID, vx2: TVertexID, edges: TEdge[]) {
    const edge = edges.find(
      (edge) =>
        (edge.vx1.id === vx1 && edge.vx2.id === vx2) ||
        (edge.vx1.id === vx2 && edge.vx2.id === vx1)
    )!

    return edge.id
  }

  public get() {
    return this.paths
  }
}
