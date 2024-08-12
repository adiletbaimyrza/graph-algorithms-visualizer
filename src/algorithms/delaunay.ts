import Delaunator from 'delaunator'
import { isNewEdgeValid } from '../components/Canvas/VertexUtils'
import { TVertex, TEdge } from '../types'

const delaunay = (vxs: TVertex[], vxsCoors: number[]): TEdge[] => {
  const delaunay = new Delaunator(vxsCoors)
  const triangles = delaunay.triangles
  const finalEdges: TEdge[] = []

  let edgeId = 0
  for (let i = 0; i < triangles.length; i += 3) {
    const vxId1 = triangles[i]
    const vxId2 = triangles[i + 1]
    const vxIe3 = triangles[i + 2]

    const edges = [
      [vxId1, vxId2],
      [vxId2, vxIe3],
      [vxIe3, vxId1],
    ]

    edges.forEach((edge) => {
      const vx1 = vxs.find(
        (vx) =>
          vx.x === vxsCoors[2 * edge[0]] && vx.y === vxsCoors[2 * edge[0] + 1]
      )!

      const vx2 = vxs.find(
        (vx) =>
          vx.x === vxsCoors[2 * edge[1]] && vx.y === vxsCoors[2 * edge[1] + 1]
      )!

      const newEdge = {
        id: edgeId,
        vx1,
        vx2,
        weight: undefined,
      }

      if (isNewEdgeValid(newEdge, finalEdges)) {
        finalEdges.push(newEdge)
        edgeId++
      }
    })
  }

  return finalEdges
}

export default delaunay
