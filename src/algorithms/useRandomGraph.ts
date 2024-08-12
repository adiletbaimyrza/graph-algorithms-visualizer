import { useEffect, useRef } from 'react'
import $ from 'jquery'
import bridson from './bridson'
import delaunay from './delaunay'
import {
  euclideanDistance,
  isOutOfBounds,
} from '../components/Canvas/CanvasUtils'
import { configureGraphSizes } from './useRandomGraphUtils'
import { TVertex, TEdge, TGraphSize, TCoord } from '../types'
import { getRandWeight } from '../components/Canvas/VertexUtils'
import {
  useVertexRadiusContext,
  useVerticesContext,
  useEdgesContext,
  useEdgeIDContext,
  useVertexIDContext,
  useFontSizeContext,
  useLineWidthContext,
  useIsWeightedContext,
} from '../store/hooks'

const useRandomGraph = () => {
  const vertexRadius = useVertexRadiusContext()
  const vertices = useVerticesContext()
  const edges = useEdgesContext()
  const edgeId = useEdgeIDContext()
  const vertexId = useVertexIDContext()
  const fontSize = useFontSizeContext()
  const lineWidth = useLineWidthContext()
  const { isWeighted } = useIsWeightedContext()
  const canvasWidth = useRef<number | undefined>(undefined)
  const canvasHeight = useRef<number | undefined>(undefined)

  useEffect(() => {
    canvasWidth.current = $('#canvas').width()
    canvasHeight.current = $('#canvas').height()
  }, [])

  const generateRandomGraph = (graphSize: TGraphSize) => {
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

    const sampling: TVertex[] = bridson(
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

    const coordinates: TCoord[] = []
    inBoundsVertices.forEach((vertex) => {
      coordinates.push(vertex.x, vertex.y)
    })

    const triangulatedEdges: TEdge[] = delaunay(inBoundsVertices, coordinates)

    const shortDistanceEdges: TEdge[] = triangulatedEdges.filter(
      (edge) =>
        euclideanDistance(edge.vx1.x, edge.vx1.y, edge.vx2.x, edge.vx2.y) <=
        radius * 2
    )

    if (isWeighted) {
      shortDistanceEdges.forEach((dg) => {
        dg.weight = getRandWeight(100)
      })
    }

    vertices.set(inBoundsVertices)
    edges.set(shortDistanceEdges)
    vertexId.set(sampling.length)
    edgeId.set(triangulatedEdges.length)
  }

  return generateRandomGraph
}

export default useRandomGraph
