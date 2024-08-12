import { useRef } from 'react'
import {
  useEdgesContext,
  useVertexIDContext,
  useVertexRadiusContext,
  useVerticesContext,
} from '../../store/hooks'
import Vertex from './Vertex'
import Edge from './Edge'
import { isVertexPositionValid } from './CanvasUtils'

import { TVertex } from '../../types'

function Canvas() {
  const vertices = useVerticesContext()
  const edges = useEdgesContext()
  const vertexId = useVertexIDContext()
  const vertexRadius = useVertexRadiusContext()

  const canvasRef = useRef<SVGSVGElement | null>(null)

  const onCanvasClick = (event: React.MouseEvent) => {
    const newVertex: TVertex = {
      id: vertexId.get(),
      x: event.clientX - canvasRef.current!.getBoundingClientRect().left,
      y: event.clientY - canvasRef.current!.getBoundingClientRect().top,
    }

    if (
      canvasRef.current &&
      isVertexPositionValid(
        newVertex,
        vertices.get(),
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
        vertexRadius.get()
      )
    ) {
      vertices.add(newVertex)
    } else {
      console.warn(
        'New vertex is too close to existing vertices or is out of bounds'
      )
    }
  }

  return (
    <svg
      id="canvas"
      ref={canvasRef}
      onClick={onCanvasClick}
      className="bg-slate-900 w-full"
    >
      {edges.get().map((edge) => (
        <Edge key={edge.id} {...edge} />
      ))}
      {vertices.get().map((vertex) => (
        <Vertex key={vertex.id} {...vertex} />
      ))}
    </svg>
  )
}

export default Canvas
