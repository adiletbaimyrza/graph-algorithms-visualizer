import { euclideanDistance, isOutOfBounds } from '../components'
import { TVertex } from '../types'

// Function to check if a grid placement is valid
// A grid placement is considered valid if it is not out of bounds and not too close to any existing vertices
const isGridPlacementValid = (
  grid: (TVertex | null)[][], // The grid to check
  numCellsWidth: number, // The number of cells in the grid's width
  numCellsHeight: number, // The number of cells in the grid's height
  vertex: TVertex, // The vertex to check
  radius: number, // The radius to check within
  cellSize: number, // The size of each cell in the grid
  canvasWidth: number, // The width of the canvas
  canvasHeight: number // The height of the canvas
): boolean => {
  // Check if the vertex is out of bounds
  if (isOutOfBounds(vertex.x, vertex.y, canvasWidth, canvasHeight)) {
    return false
  }

  // Calculate the cell indices for the vertex
  const xCellIndex: number = Math.floor(vertex.x / cellSize)
  const yCellIndex: number = Math.floor(vertex.y / cellSize)

  // Calculate the range of cells to check around the vertex
  const i0: number = Math.max(xCellIndex - 1, 0)
  const i1: number = Math.min(xCellIndex + 1, numCellsWidth - 1)
  const j0: number = Math.max(yCellIndex - 1, 0)
  const j1: number = Math.min(yCellIndex + 1, numCellsHeight - 1)

  // Check each cell in the range
  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      const gridVertex: TVertex | null = grid[i][j]
      // If the cell is not empty and the Euclidean distance to the vertex is less than the radius, the placement is invalid
      if (gridVertex !== null) {
        if (
          euclideanDistance(gridVertex.x, gridVertex.y, vertex.x, vertex.y) <
          radius
        ) {
          return false
        }
      }
    }
  }

  // If no invalid placements were found, the placement is valid
  return true
}

export { isGridPlacementValid }
