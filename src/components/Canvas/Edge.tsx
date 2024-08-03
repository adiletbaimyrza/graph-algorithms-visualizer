import { useEdges, useLineWidth } from '../../contexts'
import { TEdge } from '../../types'

const Edge = ({ id, vx1, vx2 }: TEdge) => {
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
        x1={vx1.x}
        y1={vx1.y}
        x2={vx2.x}
        y2={vx2.y}
        strokeWidth={lineWidth.get()}
        strokeDasharray={2000}
        strokeDashoffset={2000}
        className="lines stroke-green-700 animate-[drawLine_1s_forwards] group-hover:stroke-white"
      />
    </g>
  )
}

export default Edge
