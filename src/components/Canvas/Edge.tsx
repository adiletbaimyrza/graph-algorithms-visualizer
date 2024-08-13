import { useState } from 'react'
import {
  useEdgesContext,
  useFontSizeContext,
  useIsWeightedContext,
  useLineWidthContext,
} from '../../store/hooks'
import { TEdge } from '../../types'
import { Check } from './assets'

const Edge = ({ id, vx1, vx2, weight }: TEdge) => {
  const edges = useEdgesContext()
  const lineWidth = useLineWidthContext()
  const { isWeighted } = useIsWeightedContext()
  const fontSize = useFontSizeContext()
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false)
  const [tempWeight, setTempWeight] = useState<number | undefined>(weight)

  const onRightClick = (event: React.MouseEvent) => {
    event.preventDefault()
    edges.remove(id)
  }

  const onWeightClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsEditingWeight(true)
  }

  const onWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempWeight(Number(event.target.value))
  }

  const onWeightBlur = () => {
    setIsEditingWeight(false)
    edges.update(id, { weight: tempWeight })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onWeightBlur()
    }
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
      {isEditingWeight ? (
        <foreignObject
          x={(vx1.x + vx2.x) / 2 - 20}
          y={(vx1.y + vx2.y) / 2 - 10}
          width="60"
          height="50"
          className="border -translate-x-3 -translate-y-1 outline-none border-none"
        >
          <input
            type="number"
            value={tempWeight}
            onChange={onWeightChange}
            onBlur={onWeightBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none border-none text-white text-center font-bold "
            style={{ fontSize: fontSize.get(), width: '100%' }}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="bg-transparent w-full flex flex-row items-center text-center justify-center"
          >
            <img src={Check} alt="" className="w-5" />
          </button>
        </foreignObject>
      ) : (
        <text
          id={`weight-${id}`}
          x={(vx1.x + vx2.x) / 2}
          y={(vx1.y + vx2.y) / 2}
          className="stroke-white"
          style={{ fontSize: fontSize.get() }}
          onClick={onWeightClick}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {isWeighted ? weight : ''}
        </text>
      )}
    </g>
  )
}

export default Edge
