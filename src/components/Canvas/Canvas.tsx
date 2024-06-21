import useVerticesContext from '../../contexts/vertices/useVerticesContext'
import Vertex from './Vertex'

function Canvas() {
  const vertices = useVerticesContext()

  return (
    <svg className="bg-slate-900 h-full w-full">
      {vertices.get().map((vertex) => (
        <Vertex {...vertex} />
      ))}
    </svg>
  )
}

export default Canvas
