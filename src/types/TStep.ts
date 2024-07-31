import TAnim from './TAnim'

type TStep = {
  id: number
  description: string
  codeLineId: number
  animation: TAnim
  vertexId: number | undefined
  edgeId: number | undefined
}

export default TStep
