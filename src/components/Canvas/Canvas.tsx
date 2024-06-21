import { useRef } from 'react'
import useVerticesContext from '../../contexts/vertices/useVerticesContext'
import Vertex from './Vertex'
import IVertex from '../../interfaces/IVertex'
import { isVertexPositionValid } from './CanvasUtils'
import useVertexIdContext from '../../contexts/vertexId/useVertexIdContext'

function Canvas() {
  const vertices = useVerticesContext()
  const vertexId = useVertexIdContext()

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
        30
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
      ref={canvasRef}
      onClick={onCanvasClick}
      className="bg-slate-900 h-full w-full"
    >
      {vertices.get().map((vertex) => (
        <Vertex {...vertex} />
      ))}
    </svg>
  )
}

export default Canvas
