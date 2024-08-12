import { TCoord, TVertex } from '../../types'

const isOutOfBounds = (
  x: TCoord,
  y: TCoord,
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

const euclideanDistance = (x1: TCoord, y1: TCoord, x2: TCoord, y2: TCoord) => {
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
