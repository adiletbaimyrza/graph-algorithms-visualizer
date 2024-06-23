export default interface IStep {
  id: number
  description: string
  vertexId: number | undefined
  vertexColor: string | undefined
  edgeId: number | undefined
  edgeColor: string | undefined
  codeLineId: number | undefined
}
