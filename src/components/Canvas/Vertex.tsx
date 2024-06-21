import IVertex from '../../interfaces/IVertex'
import useVerticesContext from '../../contexts/vertices/useVerticesContext'

const Vertex = ({ id, x, y }: IVertex) => {
  const vertices = useVerticesContext()

  const onVertexRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    vertices.remove(id)
  }

  return (
    <g onContextMenu={onVertexRightClick}>
      <circle
        id={`circle-${id}`}
        cx={x}
        cy={y}
        r={30}
        className="stroke-slate-300 fill-slate-300"
      ></circle>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
      >
        {id}
      </text>
    </g>
  )
}

export default Vertex
