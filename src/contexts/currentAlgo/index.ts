import { useContext } from 'react'
import {
  CurrentAlgoContext,
  CurrentAlgoContextType,
} from './CurrentAlgoContext'

const useCurrentAlgo = (): CurrentAlgoContextType => {
  const currentAlgoContext = useContext(CurrentAlgoContext)

  if (!currentAlgoContext) {
    throw new Error(
      'CurrentAlgoContext has to be used within <CurrentAlgoContext.Provider>'
    )
  }

  return currentAlgoContext
}

export default useCurrentAlgo
