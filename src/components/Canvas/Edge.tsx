import useEdges from '../../contexts/edges'
import useFontSize from '../../contexts/fontSize'
import useLineWidth from '../../contexts/lineWidth'
import useIsWeightedCtx from '../../contexts/isWeightedCtxHook'
import TEdge from '../../types/TEdge'

const Edge = ({ id, vx1, vx2, weight }: TEdge) => {
  const edges = useEdges()
  const lineWidth = useLineWidth()
  const { isWeighted } = useIsWeightedCtx()
  const fontSize = useFontSize()

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
      <text
        id={`weight-${id}`}
        x={(vx1.x + vx2.x) / 2}
        y={(vx1.y + vx2.y) / 2}
        className={` stroke-white font-thin`}
        fontSize={fontSize.get()}
      >
        {isWeighted ? weight : ''}
      </text>
    </g>
  )
}

export default Edge
