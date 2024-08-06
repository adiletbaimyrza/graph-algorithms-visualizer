import { useContext } from 'react'
import { IsWeightedCtx, IsWeightedCtxType } from './IsWeightedCtx'

const useIsWeightedCtx = (): IsWeightedCtxType => {
  const isWeightedCtx = useContext(IsWeightedCtx)

  if (!isWeightedCtx) {
    throw new Error(
      'IsWeightedCtx has to be used within <IsWeightedCtx.Provider>'
    )
  }

  return isWeightedCtx
}

export default useIsWeightedCtx
