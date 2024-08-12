import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import $ from 'jquery'
import useVertices from '../../contexts/vertices'
import useLinkingVertex from '../../contexts/linkingVertex'
import useEdges from '../../contexts/edges'
import useFontSize from '../../contexts/fontSize'
import useEdgeId from '../../contexts/edgeId'
import useVertexRadius from '../../contexts/vertexRadius'
import { isNewEdgeValid } from './VertexUtils'
import { toggleLinkingVertex } from './VertexAnims'
import useIsWeightedCtx from '../../contexts/isWeightedCtxHook'
import { getRandWeight } from './VertexUtils'

import { TVertex, TEdge } from '../../types'

const Vertex = ({ id, x, y }: TVertex) => {
  const vertices = useVertices()
  const edges = useEdges()
  const linkingVertex = useLinkingVertex()
  const edgeId = useEdgeId()
  const vertexRadius = useVertexRadius()
  const fontSize = useFontSize()
  const vertexRef = useRef<SVGGElement | null>(null)

  const { isWeighted } = useIsWeightedCtx()

  useEffect(() => {
    const onVertexDrag = (
      event: d3.D3DragEvent<SVGGElement, unknown, unknown>
    ) => {
      const vertex = d3.select(vertexRef.current)
      vertex.attr('transform', `translate(${event.x}, ${event.y})`)

      const itsEdges = edges
        .get()
        .filter((edge) => edge.vx1.id === id || edge.vx2.id === id)

      itsEdges.forEach((itsEdge) => {
        const edge = $(`#line-${itsEdge.id}`)
        const weight = $(`#weight-${itsEdge.id}`)

        if (edge) {
          if (itsEdge.vx1.id === id) {
            edge.attr('x1', itsEdge.vx1.x + event.x)
            edge.attr('y1', itsEdge.vx1.y + event.y)

            weight.attr('x', (itsEdge.vx1.x + event.x + itsEdge.vx2.x) / 2)
            weight.attr('y', (itsEdge.vx1.y + event.y + itsEdge.vx2.y) / 2)
          } else if (itsEdge.vx2.id === id) {
            edge.attr('x2', itsEdge.vx2.x + event.x)
            edge.attr('y2', itsEdge.vx2.y + event.y)

            weight.attr('x', (itsEdge.vx2.x + event.x + itsEdge.vx1.x) / 2)
            weight.attr('y', (itsEdge.vx2.y + event.y + itsEdge.vx1.y) / 2)
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
      }) as TVertex[]

      const newEdges = edges.get().map((edge) => {
        const edgeInDOM = $(`#line-${edge.id}`)
        const weight = $(`#weight-${edge.id}`)

        if (edgeInDOM) {
          const x1 = Number(edgeInDOM.attr('x1'))
          const y1 = Number(edgeInDOM.attr('y1'))
          const x2 = Number(edgeInDOM.attr('x2'))
          const y2 = Number(edgeInDOM.attr('y2'))

          weight.attr('x', (x1 + x2) / 2)
          weight.attr('y', (y1 + y2) / 2)

          return {
            ...edge,
            vx1: { ...edge.vx1, x: x1, y: y1 },
            vx2: { ...edge.vx2, x: x2, y: y2 },
          }
        }
      }) as TEdge[]

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

    const linkVxVal = linkingVertex.get()

    if (linkVxVal) {
      const newDg: TEdge = {
        id: edgeId.get(),
        vx1: linkVxVal,
        vx2: { id, x, y },
        weight: isWeighted ? getRandWeight(100) : undefined,
      }

      if (isNewEdgeValid(newDg, edges.get())) {
        edges.add(newDg)
      } else {
        console.warn('Same edge clicked or the edge already exists')
      }

      linkingVertex.reset()
      toggleLinkingVertex(linkVxVal.id)
    } else {
      linkingVertex.set({ id, x, y })
      toggleLinkingVertex(id)
    }
  }

  const onVertexRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    const filteredEdges: TEdge[] = edges
      .get()
      .filter((edge) => !(edge.vx1.id == id || edge.vx2.id == id))

    vertices.remove(id)
    edges.set(filteredEdges)
  }

  return (
    <g
      onClick={onVertexLeftClick}
      onContextMenu={onVertexRightClick}
      ref={vertexRef}
      className="group"
    >
      <circle
        id={`circle-${id}`}
        cx={x}
        cy={y}
        r={vertexRadius.get()}
        className="circles stroke-slate-400 fill-slate-400 group-hover:stroke-white stroke-[3]"
      ></circle>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize.get()}
        className="select-none"
      >
        {id}
      </text>
    </g>
  )
}

export default Vertex
