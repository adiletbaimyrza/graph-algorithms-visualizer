import TAnim from './TAnim'

type TStep = {
  id: number
  dsc: string
  cdId: number
  anim: TAnim
  vxId: number | undefined
  dgId: number | undefined
  vxId2: number | undefined
}

export default TStep
