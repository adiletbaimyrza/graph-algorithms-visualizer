import { useEffect, useRef } from 'react'
import $ from 'jquery'
import useVertexRadius from '../contexts/vertexRadius'
import useVertices from '../contexts/vertices'
import useEdges from '../contexts/edges'
import useEdgeId from '../contexts/edgeId'
import useVertexId from '../contexts/vertexId'
import useFontSize from '../contexts/fontSize'
import useLineWidth from '../contexts/lineWidth'
import bridson from './bridson'
import delaunay from './delaunay'
import {
  euclideanDistance,
  isOutOfBounds,
} from '../components/Canvas/CanvasUtils'
import { configureGraphSizes } from './useRandomGraphUtils'
import { TVertex, TEdge, TGraphSize, TCoord } from '../types'
import useIsWeightedCtx from '../contexts/isWeightedCtxHook'
import { getRandWeight } from '../components/Canvas/VertexUtils'

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

  const { isWeighted } = useIsWeightedCtx()

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
