import IVertex from './IVertex'
import IEdge from './IEdge'

type AdjListType = Map<number, { edge: IEdge; vertex: IVertex }[]>
export default AdjListType
