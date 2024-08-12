import TVertex from '../../types/TVertex'

const isOutOfBounds = (
  x: number,
  y: number,
  frameWidth: number,
  frameHeight: number,
  padding: number = 0
) => {
  return (
    x - padding < 0 ||
    y - padding < 0 ||
    x + padding > frameWidth ||
    y + padding > frameHeight
  )
}

const euclideanDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

const isVertexPositionValid = (
  vertex: TVertex,
  vertices: TVertex[],
  canvasWidth: number,
  canvasHeight: number,
  vertexRadius: number
): boolean => {
  const isTooCloseToOtherVertices = vertices.some(
    (existingVertex) =>
      euclideanDistance(
        vertex.x,
        vertex.y,
        existingVertex.x,
        existingVertex.y
      ) <
      vertexRadius * 2 + vertexRadius / 4
  )

  const isVertexOutOfBounds = isOutOfBounds(
    vertex.x,
    vertex.y,
    canvasWidth,
    canvasHeight,
    vertexRadius
  )

  return !(isTooCloseToOtherVertices || isVertexOutOfBounds)
}

export { isOutOfBounds, euclideanDistance, isVertexPositionValid }
