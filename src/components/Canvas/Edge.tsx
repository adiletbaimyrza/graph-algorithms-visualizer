import useEdgesContext from '../../contexts/edges/useEdgesContext'
import IEdge from '../../interfaces/IEdge'

const Edge = ({ id, vertexOne, vertexTwo }: IEdge) => {
  const edges = useEdgesContext()

  const onRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    edges.remove(id)
  }

  return (
    <g onContextMenu={onRightClick}>
      <line
        id={`line-${id}`}
        x1={vertexOne.x}
        y1={vertexOne.y}
        x2={vertexTwo.x}
        y2={vertexTwo.y}
        strokeWidth={5}
        strokeDasharray={2000}
        strokeDashoffset={2000}
        className="stroke-orange-300 animate-[drawLine_1s_forwards]"
      />
    </g>
  )
}

export default Edge
