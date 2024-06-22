import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import $ from 'jquery'
import useVerticesContext from '../../contexts/vertices/useVerticesContext'
import useLinkingVertexContext from '../../contexts/linkingVertex/useLinkingVertexContext'
import useEdgeIdContext from '../../contexts/edgeId/useEdgeIdContext'
import useEdgesContext from '../../contexts/edges/useEdgesContext'
import { isNewEdgeValid } from './VertexUtils'
import { toggleLinkingVertex } from './VertexAnims'
import IVertex from '../../interfaces/IVertex'
import IEdge from '../../interfaces/IEdge'

const Vertex = ({ id, x, y }: IVertex) => {
  const vertices = useVerticesContext()
  const edges = useEdgesContext()
  const linkingVertex = useLinkingVertexContext()
  const edgeId = useEdgeIdContext()
  const vertexRef = useRef<SVGGElement | null>(null)

  useEffect(() => {
    const onVertexDrag = (
      event: d3.D3DragEvent<SVGGElement, unknown, unknown>
    ) => {
      const vertex = d3.select(vertexRef.current)
      vertex.attr('transform', `translate(${event.x}, ${event.y})`)

      const itsEdges = edges
        .get()
        .filter((edge) => edge.vertexOne.id === id || edge.vertexTwo.id === id)

      itsEdges.forEach((itsEdge) => {
        const edge = $(`#line-${itsEdge.id}`)

        if (edge) {
          if (itsEdge.vertexOne.id === id) {
            edge.attr('x1', itsEdge.vertexOne.x + event.x)
            edge.attr('y1', itsEdge.vertexOne.y + event.y)
          } else if (itsEdge.vertexTwo.id === id) {
            edge.attr('x2', itsEdge.vertexTwo.x + event.x)
            edge.attr('y2', itsEdge.vertexTwo.y + event.y)
          }
        }
      })
    }

    const onVertexDragEnd = (
      event: d3.D3DragEvent<SVGGElement, unknown, unknown>
    ) => {
      const vertex = d3.select(vertexRef.current)
      vertex.attr('transform', null)

      vertex
        .select('circle')
        .attr('cx', Number(vertex.select('circle').attr('cx')) + event.x)
        .attr('cy', Number(vertex.select('circle').attr('cy')) + event.y)
      vertex
        .select('text')
        .attr('x', Number(vertex.select('text').attr('x')) + event.x)
        .attr('y', Number(vertex.select('text').attr('y')) + event.y)

      const newVertices = vertices.get().map((vertex) => {
        const vertexInDOM = $(`#circle-${vertex.id}`)
        if (vertexInDOM) {
          const x = Number(vertexInDOM.attr('cx'))
          const y = Number(vertexInDOM.attr('cy'))

          return {
            ...vertex,
            x,
            y,
          }
        }
      }) as IVertex[]

      const newEdges = edges.get().map((edge) => {
        const edgeInDOM = $(`#line-${edge.id}`)
        if (edgeInDOM) {
          const x1 = Number(edgeInDOM.attr('x1'))
          const y1 = Number(edgeInDOM.attr('y1'))
          const x2 = Number(edgeInDOM.attr('x2'))
          const y2 = Number(edgeInDOM.attr('y2'))

          return {
            ...edge,
            vertexOne: { ...edge.vertexOne, x: x1, y: y1 },
            vertexTwo: { ...edge.vertexTwo, x: x2, y: y2 },
          }
        }
      }) as IEdge[]

      vertices.set(newVertices)
      edges.set(newEdges)
    }

    const vertexDragHandler = d3
      .drag<SVGGElement, unknown>()
      .subject(() => {
        const vertex = d3.select(vertexRef.current).node()
        let transform = undefined
        if (vertex) {
          transform = vertex.getCTM()
        }

        return { x: transform?.e, y: transform?.f }
      })
      .on('drag', (event) => onVertexDrag(event))
      .on('end', (event) => onVertexDragEnd(event))

    if (vertexRef.current) {
      vertexDragHandler(d3.select(vertexRef.current))
    }
  }, [edges, vertices, id])

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

    const filteredEdges: IEdge[] = edges
      .get()
      .filter((edge) => !(edge.vertexOne.id == id || edge.vertexTwo.id == id))

    vertices.remove(id)
    edges.set(filteredEdges)
  }

  return (
    <g
      onClick={onVertexLeftClick}
      onContextMenu={onVertexRightClick}
      ref={vertexRef}
    >
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
