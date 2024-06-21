import IVertex from '../../interfaces/IVertex'
import IEdge from '../../interfaces/IEdge'
import useVerticesContext from '../../contexts/vertices/useVerticesContext'
import useLinkingVertexContext from '../../contexts/linkingVertex/useLinkingVertexContext'
import useEdgeIdContext from '../../contexts/edgeId/useEdgeIdContext'
import { isNewEdgeValid } from './VertexUtils'
import useEdgesContext from '../../contexts/edges/useEdgesContext'
import { toggleLinkingVertex } from './VertexAnims'

const Vertex = ({ id, x, y }: IVertex) => {
  const vertices = useVerticesContext()
  const edges = useEdgesContext()
  const linkingVertex = useLinkingVertexContext()
  const edgeId = useEdgeIdContext()

  const onVertexLeftClick = (event: React.MouseEvent) => {
    event.stopPropagation()

    const linkingVertexValue = linkingVertex.get()

    if (linkingVertexValue) {
      const newEdge: IEdge = {
        id: edgeId.get(),
        vertexOne: linkingVertexValue,
        vertexTwo: { id, x, y },
      }

      if (isNewEdgeValid(newEdge, edges.get())) {
        edges.add(newEdge)
      } else {
        console.warn('Same edge clicked or the edge already exists')
      }

      linkingVertex.reset()
      toggleLinkingVertex(linkingVertexValue.id)
    } else {
      linkingVertex.set({ id, x, y })
      toggleLinkingVertex(id)
    }
  }

  const onVertexRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    vertices.remove(id)
  }

  return (
    <g onClick={onVertexLeftClick} onContextMenu={onVertexRightClick}>
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
        fontSize={12}
        className="select-none"
      >
        {id}
      </text>
    </g>
  )
}

export default Vertex
