import { GraphSizeType } from '../interfaces'

const configureGraphSizes = (
  graphSize: GraphSizeType,
  vertexRadiusSet: (newVertexRadius: number) => void,
  fontSizeSet: (newFontSize: number) => void,
  lineWidthSet: (newLineWidth: number) => void
) => {
  let radius: number

  switch (graphSize) {
    case 'xs':
      radius = 400
      vertexRadiusSet(30)
      fontSizeSet(16)
      lineWidthSet(10)
      break
    case 's':
      radius = 250
      vertexRadiusSet(25)
      fontSizeSet(14)
      lineWidthSet(8)
      break
    case 'm':
      radius = 100
      vertexRadiusSet(20)
      fontSizeSet(12)
      lineWidthSet(6)
      break
    case 'l':
      radius = 50
      vertexRadiusSet(15)
      fontSizeSet(10)
      lineWidthSet(4)
      break
    case 'xl':
      radius = 25
      vertexRadiusSet(8)
      fontSizeSet(8)
      lineWidthSet(3)
  }

  return radius
}

export { configureGraphSizes }
