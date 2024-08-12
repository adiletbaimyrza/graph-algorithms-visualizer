import {
  TVertex,
  TEdge,
  TAdjacencyList,
  TWeightedPaths,
  TVertexID,
} from '../types'

export default class WeightedPaths {
  private paths: TWeightedPaths

  constructor(vertices: TVertex[], edges: TEdge[], adj: TAdjacencyList) {
    this.paths = new Map<TVertexID, Map<TVertexID, number[]>>()

    vertices.forEach((vertex) => {
      const neighbors = adj.get(vertex.id)!
      const itsPaths = new Map<TVertexID, number[]>()

      neighbors.forEach((neighbor) => {
        const edge = this.getEdgeWithWeight(vertex.id, neighbor, edges)
        itsPaths.set(neighbor, edge)
      })

      this.paths.set(vertex.id, itsPaths)
    })
  }

  private getEdgeWithWeight(vx1: TVertexID, vx2: TVertexID, edges: TEdge[]) {
    const dg = edges.find(
      (dg) =>
        (dg.vx1.id === vx1 && dg.vx2.id === vx2) ||
        (dg.vx1.id === vx2 && dg.vx2.id === vx1)
    )!

    return [dg.id!, dg.weight!]
  }

  public get() {
    return this.paths
  }
}
