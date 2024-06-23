import { useRef } from 'react'
import {
  useVertices,
  useVertexId,
  useEdges,
  useVertexRadius,
} from '../../contexts'
import Vertex from './Vertex'
import Edge from './Edge'
import { isVertexPositionValid } from './CanvasUtils'
import { IVertex } from '../../interfaces'

function Canvas() {
  const vertices = useVertices()
  const edges = useEdges()
  const vertexId = useVertexId()
  const vertexRadius = useVertexRadius()

  const canvasRef = useRef<SVGSVGElement | null>(null)

  const onCanvasClick = (event: React.MouseEvent) => {
    const newVertex: IVertex = {
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
