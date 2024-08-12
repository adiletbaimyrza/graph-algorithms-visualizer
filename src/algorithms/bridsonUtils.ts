import { euclideanDistance } from '../components/Canvas/CanvasUtils'
import { isOutOfBounds } from '../components/Canvas/CanvasUtils'
import TVertex from '../types/TVertex'

const isGridPlacementValid = (
  grid: (TVertex | null)[][],
  numCellsWidth: number,
  numCellsHeight: number,
  vertex: TVertex,
  radius: number,
  cellSize: number,
  canvasWidth: number,
  canvasHeight: number
): boolean => {
  if (isOutOfBounds(vertex.x, vertex.y, canvasWidth, canvasHeight)) {
    return false
  }

  const xCellIndex: number = Math.floor(vertex.x / cellSize)
  const yCellIndex: number = Math.floor(vertex.y / cellSize)

  const i0: number = Math.max(xCellIndex - 1, 0)
  const i1: number = Math.min(xCellIndex + 1, numCellsWidth - 1)
  const j0: number = Math.max(yCellIndex - 1, 0)
  const j1: number = Math.min(yCellIndex + 1, numCellsHeight - 1)

  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      const gridVertex: TVertex | null = grid[i][j]

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

  return true
}

export { isGridPlacementValid }
