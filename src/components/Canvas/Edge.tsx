import { useEdges, useLineWidth } from '../../contexts'
import { TEdge } from '../../types'

const Edge = ({ id, vertexOne, vertexTwo }: TEdge) => {
  const edges = useEdges()
  const lineWidth = useLineWidth()

  const onRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    edges.remove(id)
  }

  return (
    <g onContextMenu={onRightClick} className="group">
      <line
        id={`line-${id}`}
        x1={vertexOne.x}
        y1={vertexOne.y}
        x2={vertexTwo.x}
        y2={vertexTwo.y}
        strokeWidth={lineWidth.get()}
        strokeDasharray={2000}
        strokeDashoffset={2000}
        className="stroke-green-700 animate-[drawLine_1s_forwards] group-hover:stroke-white"
      />
    </g>
  )
}

export default Edge
