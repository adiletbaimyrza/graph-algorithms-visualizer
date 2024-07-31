import $ from 'jquery'
import { TAnim } from '../types'

const vertexColors = {
  default: 'fill-slate-400',
  looked: 'fill-red-200',
  chosen: 'fill-yellow-700',
  visited: 'fill-red-700',
}
const edgeColors = {
  default: 'stroke-green-700',
  looked: 'stroke-red-200',
  chosen: 'stroke-yellow-700',
  visited: 'stroke-red-700',
}
const codeLineColors = { default: 'bg-slate-600', highlighted: 'bg-yellow-700' }

const vertexColorsList = Object.values(vertexColors)
const edgeColorsList = Object.values(edgeColors)
const codeLineColorsList = Object.values(codeLineColors)

const paintPath = (
  vertexId: number,
  edgeId: number | undefined,
  animation: TAnim
) => {
  let paintVertexTo = ''
  let paintEdgeTo = ''

  switch (animation) {
    case 'toBeChosen':
      paintVertexTo = vertexColors.chosen
      paintEdgeTo = edgeColors.chosen
      break
    case 'toBeLooked':
      paintVertexTo = vertexColors.looked
      paintEdgeTo = edgeColors.looked
      break
    case 'toBeVisited':
      paintVertexTo = vertexColors.visited
      paintEdgeTo = edgeColors.visited
  }
  $(`#circle-${vertexId}`).removeClass(vertexColorsList).addClass(paintVertexTo)
  if (edgeId) {
    $(`#line-${edgeId}`).removeClass(edgeColorsList).addClass(paintEdgeTo)
  }
}

const highlightCodeLine = (codeLineId: number) => {
  $(`#pseudo-${codeLineId}`)
    .removeClass(codeLineColorsList)
    .addClass(codeLineColors.highlighted)
}

const resetStyles = () => {
  const defaultVertex = vertexColors.default
  const defaultEdge = edgeColors.default
  const defaultCodeLine = codeLineColors.default

  $('circle').each(function () {
    $(this).removeClass(vertexColorsList).addClass(defaultVertex)
  })

  $('line').each(function () {
    $(this).removeClass(edgeColorsList).addClass(defaultEdge)
  })

  $('p').each(function () {
    $(this).removeClass(codeLineColorsList).addClass(defaultCodeLine)
  })
}

export { paintPath, highlightCodeLine, resetStyles }
