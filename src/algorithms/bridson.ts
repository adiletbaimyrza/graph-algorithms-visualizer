import { isGridPlacementValid } from './bridsonUtils'
import TVertex from '../types/TVertex'

const bridson = (
  radius: number,
  canvasWidth: number,
  canvasHeight: number
): TVertex[] => {
  const maxAttempts: number = 30
  const numDimensions: number = 2
  const finalVertices: TVertex[] = []
  const activeVertices: TVertex[] = []
  const cellSize: number = Math.floor(radius / Math.sqrt(numDimensions))
  const numCellsWidth: number = Math.ceil(canvasWidth / cellSize)
  const numCellsHeight: number = Math.ceil(canvasHeight / cellSize)

  const randomX: number = Math.floor(Math.random() * canvasWidth)
  const randomY: number = Math.floor(Math.random() * canvasHeight)
  const initialVertex: TVertex = {
    id: finalVertices.length,
    x: randomX,
    y: randomY,
  }

  const grid: (TVertex | null)[][] = new Array(numCellsWidth)
  for (let i = 0; i < numCellsWidth; i++) {
    grid[i] = new Array(numCellsHeight) as (TVertex | null)[]
    for (let j = 0; j < numCellsHeight; j++) {
      grid[i][j] = null
    }
  }

  const xCellIndex: number = Math.floor(initialVertex.x / cellSize)
  const yCellIndex: number = Math.floor(initialVertex.y / cellSize)
  grid[xCellIndex][yCellIndex] = initialVertex

  activeVertices.push(initialVertex)
  finalVertices.push(initialVertex)

  while (activeVertices.length > 0) {
    const randomIndex: number = Math.floor(
      Math.random() * activeVertices.length
    )
    const currentVertex: TVertex = activeVertices[randomIndex]

    let validVertexFound: boolean = false

    for (let tries = 0; tries < maxAttempts; tries++) {
      const theta: number = Math.floor(Math.random() * 360)
      const newRadius: number = Math.floor(
        Math.random() * (2 * radius - radius) + radius
      )
      const thetaInRadians: number = (theta * Math.PI) / 180
      const newVertexX: number =
        currentVertex.x + newRadius * Math.cos(thetaInRadians)
      const newVertexY: number =
        currentVertex.y + newRadius * Math.sin(thetaInRadians)

      const vertexCandidate: TVertex = {
        id: finalVertices.length,
        x: newVertexX,
        y: newVertexY,
      }

      if (
        !isGridPlacementValid(
          grid,
          numCellsWidth,
          numCellsHeight,
          vertexCandidate,
          radius,
          cellSize,
          canvasWidth,
          canvasHeight
        )
      ) {
        continue
      }

      const newVertex: TVertex = {
        id: finalVertices.length,
        x: newVertexX,
        y: newVertexY,
      }

      const xCellIndex: number = Math.floor(newVertex.x / cellSize)
      const yCellindex: number = Math.floor(newVertex.y / cellSize)
      grid[xCellIndex][yCellindex] = newVertex as TVertex

      finalVertices.push(newVertex)
      activeVertices.push(newVertex)

      validVertexFound = true
      break
    }

    if (!validVertexFound) {
      activeVertices.splice(randomIndex, 1)
    }
  }

  return finalVertices
}

export default bridson
