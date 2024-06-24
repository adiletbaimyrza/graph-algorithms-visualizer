import { useContext } from 'react'
import {
  IsAnimatingContext,
  IsAnimatingContextType,
} from './IsAnimatingContext'

const useIsAnimating = (): IsAnimatingContextType => {
  const isAnimatingContext = useContext(IsAnimatingContext)

  if (!isAnimatingContext) {
    throw new Error(
      'IsAnimatingContext has to be used within <IsAnimatingContext.Provider>'
    )
  }

  return isAnimatingContext
}

export default useIsAnimating
