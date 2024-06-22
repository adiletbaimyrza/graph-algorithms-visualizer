import { isGridPlacementValid } from './bridsonUtils'
import IVertex from '../interfaces/IVertex'

// Bridson's algorithm for fast Poisson disk sampling in arbitrary dimensions
const bridson = (
  radius: number,
  canvasWidth: number,
  canvasHeight: number
): IVertex[] => {
  // Number of tries before rejection
  const maxAttempts: number = 30
  // dimension is 2D, since we use 2D svg
  const numDimensions: number = 2
  // Final array of vertices to return
  const finalVertices: IVertex[] = []
  // Active array of vertices 'active list'
  const activeVertices: IVertex[] = []
  // Size of a cell inside a grid
  const cellSize: number = Math.floor(radius / Math.sqrt(numDimensions))
  // The number of cells in the grid for the canvas
  const numCellsWidth: number = Math.ceil(canvasWidth / cellSize)
  const numCellsHeight: number = Math.ceil(canvasHeight / cellSize)

  // Initialize first random vertex
  const randomX: number = Math.floor(Math.random() * canvasWidth)
  const randomY: number = Math.floor(Math.random() * canvasHeight)
  const initialVertex: IVertex = {
    id: finalVertices.length,
    x: randomX,
    y: randomY,
  }

  // Initialize the grid
  const grid: (IVertex | null)[][] = new Array(numCellsWidth)
  for (let i = 0; i < numCellsWidth; i++) {
    grid[i] = new Array(numCellsHeight) as (IVertex | null)[]
    for (let j = 0; j < numCellsHeight; j++) {
      grid[i][j] = null
    }
  }

  // Add initial vertex to the grid, active list, and final vertices
  const xCellIndex: number = Math.floor(initialVertex.x / cellSize)
  const yCellIndex: number = Math.floor(initialVertex.y / cellSize)
  grid[xCellIndex][yCellIndex] = initialVertex

  activeVertices.push(initialVertex)
  finalVertices.push(initialVertex)

  // While there are still active vertices
  while (activeVertices.length > 0) {
    // Pick a random vertex from activeVertices list
    const randomIndex: number = Math.floor(
      Math.random() * activeVertices.length
    )
    const currentVertex: IVertex = activeVertices[randomIndex]

    let validVertexFound: boolean = false

    for (let tries = 0; tries < maxAttempts; tries++) {
      // Pick a random angle
      const theta: number = Math.floor(Math.random() * 360)
      // Pick a random radius between r and 2r
      const newRadius: number = Math.floor(
        Math.random() * (2 * radius - radius) + radius
      )
      // Find x and y coordinates relative to currentVertex
      const thetaInRadians: number = (theta * Math.PI) / 180
      const newVertexX: number =
        currentVertex.x + newRadius * Math.cos(thetaInRadians)
      const newVertexY: number =
        currentVertex.y + newRadius * Math.sin(thetaInRadians)

      const vertexCandidate: IVertex = {
        id: finalVertices.length,
        x: newVertexX,
        y: newVertexY,
      }

      // Check if it is valid vertex in grid
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

      const newVertex: IVertex = {
        id: finalVertices.length,
        x: newVertexX,
        y: newVertexY,
      }

      // Add vertex and set validVertexFound to true, if valid
      const xCellIndex: number = Math.floor(newVertex.x / cellSize)
      const yCellindex: number = Math.floor(newVertex.y / cellSize)
      grid[xCellIndex][yCellindex] = newVertex as IVertex

      finalVertices.push(newVertex)
      activeVertices.push(newVertex)

      validVertexFound = true
      break
    }

    // If no valid vertex was found after maxAttempts tries, remove currentVertex
    if (!validVertexFound) {
      activeVertices.splice(randomIndex, 1)
    }
  }

  // Return the final array of vertices
  return finalVertices
}

export default bridson
