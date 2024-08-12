import TVertex from './TVertex'
import TVxId from './TVxId'
import TWeight from './TWeight'

type TEdge = {
  id: TVxId
  vx1: TVertex
  vx2: TVertex
  weight: TWeight | undefined
}

export default TEdge
