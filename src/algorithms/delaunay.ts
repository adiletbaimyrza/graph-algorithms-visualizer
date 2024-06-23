import Delaunator from 'delaunator'
import { isNewEdgeValid } from '../components/Canvas/VertexUtils'
import IVertex from '../interfaces/IVertex'
import IEdge from '../interfaces/IEdge'

// Function to generate Delaunay triangulation edges from vertices
const delaunay = (
  vertices: IVertex[],
  verticesCoordinates: number[]
): IEdge[] => {
  // Create a new Delaunator object from the vertices coordinates
  const delaunay: Delaunator<unknown> = new Delaunator(verticesCoordinates)
  // Get the triangles from the Delaunator object
  const triangles: Uint32Array = delaunay.triangles
  // Initialize an array to hold the final edges
  const finalEdges: IEdge[] = []

  // Initialize a counter for edge ids
  let edgeId = 0
  // Loop over the triangles
  for (let i = 0; i < triangles.length; i += 3) {
    // Get the indices of the vertices of the current triangle
    const vertexIdOne = triangles[i]
    const vertexIdTwo = triangles[i + 1]
    const vertexIdThree = triangles[i + 2]

    // Create an array of pairs of vertices indices (edges)
    const edges = [
      [vertexIdOne, vertexIdTwo],
      [vertexIdTwo, vertexIdThree],
      [vertexIdThree, vertexIdOne],
    ]

    // Loop over the pairs of vertices indices (edges)
    edges.forEach((edge) => {
      // Find the vertices corresponding to the current pair of indices
      const vertexOne = vertices.find(
        (vertex) =>
          vertex.x === verticesCoordinates[2 * edge[0]] &&
          vertex.y === verticesCoordinates[2 * edge[0] + 1]
      ) as IVertex

      const vertexTwo = vertices.find(
        (vertex) =>
          vertex.x === verticesCoordinates[2 * edge[1]] &&
          vertex.y === verticesCoordinates[2 * edge[1] + 1]
      ) as IVertex

      // Create a new edge from the vertices
      const newEdge: IEdge = {
        id: edgeId,
        vertexOne,
        vertexTwo,
      }

      // If the edge is valid, add it to the final edges
      if (isNewEdgeValid(newEdge, finalEdges)) {
        finalEdges.push(newEdge)

        // Increment edgeId
        edgeId++
      }
    })
  }

  // Return the final edges
  return finalEdges
}

export default delaunay
