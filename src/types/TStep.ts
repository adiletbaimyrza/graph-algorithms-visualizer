import TAnim from './TAnim'
import TDgId from './TDgId'
import TVxId from './TVxId'

type TStep = {
  id: number
  dsc: string
  cdId: number
  anim: TAnim
  vxId: TVxId | undefined
  dgId: TDgId | undefined
  vxId2: TVxId | undefined
}

export default TStep
