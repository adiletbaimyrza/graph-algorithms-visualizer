import { TAdjList, TVertex, TEdge, TPath } from '../types'

const createAdjList = (vertices: TVertex[], edges: TEdge[]) => {
  const adjacencyList: TAdjList = new Map<number, TPath[]>()

  vertices.forEach((vertex) => {
    const itsEdges: TEdge[] = edges.filter(
      (edge) =>
        edge.vertexOne.id === vertex.id || edge.vertexTwo.id === vertex.id
    )

    const paths: TPath[] = []
    itsEdges.forEach((itsEdge) => {
      paths.push({
        edge: itsEdge,
        vertex:
          itsEdge.vertexOne.id === vertex.id
            ? itsEdge.vertexTwo
            : itsEdge.vertexOne,
      })
    })

    adjacencyList.set(vertex.id, paths)
  })

  return adjacencyList
}

export default createAdjList
