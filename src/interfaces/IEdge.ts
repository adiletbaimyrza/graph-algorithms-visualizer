import IVertex from './IVertex'

export default interface IEdge {
  id: number
  vertexOne: IVertex
  vertexTwo: IVertex
}
