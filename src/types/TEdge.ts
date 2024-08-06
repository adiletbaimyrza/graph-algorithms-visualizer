import TVertex from './TVertex'

type TEdge = {
  id: number
  vx1: TVertex
  vx2: TVertex
  weight: number | undefined
}

export default TEdge
