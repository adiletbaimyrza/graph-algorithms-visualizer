import { useEffect, useRef } from 'react'
import $ from 'jquery'
import {
  useVertexRadius,
  useVertices,
  useEdges,
  useEdgeId,
  useVertexId,
  useFontSize,
  useLineWidth,
} from '../contexts'
import bridson from './bridson'
import delaunay from './delaunay'
import { euclideanDistance, isOutOfBounds } from '../components'
import { configureGraphSizes } from './useRandomGraphUtils'
import { IVertex, IEdge, GraphSizeType } from '../interfaces'

const useRandomGraph = () => {
  const vertexRadius = useVertexRadius()
  const vertices = useVertices()
  const edges = useEdges()
  const edgeId = useEdgeId()
  const vertexId = useVertexId()
  const fontSize = useFontSize()
  const lineWidth = useLineWidth()
  const canvasWidth = useRef<number | undefined>(undefined)
  const canvasHeight = useRef<number | undefined>(undefined)

  useEffect(() => {
    canvasWidth.current = $('#canvas').width()
    canvasHeight.current = $('#canvas').height()
  }, [])

  const generateRandomGraph = (graphSize: GraphSizeType) => {
    const radius = configureGraphSizes(
      graphSize,
      vertexRadius.set,
      fontSize.set,
      lineWidth.set
    )

    vertices.set([])
    edges.set([])
    vertexId.reset()
    edgeId.reset()

    const sampling: IVertex[] = bridson(
      radius,
      canvasWidth.current!,
      canvasHeight.current!
    )

    const inBoundsVertices = sampling.filter(
      (sample) =>
        !isOutOfBounds(
          sample.x,
          sample.y,
          canvasWidth.current!,
          canvasHeight.current!,
          vertexRadius.get() * 2
        )
    )

    const coordinates: number[] = []
    inBoundsVertices.forEach((vertex) => {
      coordinates.push(vertex.x, vertex.y)
    })

    const triangulatedEdges: IEdge[] = delaunay(inBoundsVertices, coordinates)

    const shortDistanceEdges: IEdge[] = triangulatedEdges.filter(
      (edge) =>
        euclideanDistance(
          edge.vertexOne.x,
          edge.vertexOne.y,
          edge.vertexTwo.x,
          edge.vertexTwo.y
        ) <=
        radius * 2
    )

    vertices.set(inBoundsVertices)
    edges.set(shortDistanceEdges)
    vertexId.set(sampling.length)
    edgeId.set(triangulatedEdges.length)
  }

  return generateRandomGraph
}

export default useRandomGraph
