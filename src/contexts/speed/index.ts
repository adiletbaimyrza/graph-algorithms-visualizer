import { useContext } from 'react'
import { SpeedContext, SpeedContextType } from './SpeedContext'

const useSpeed = (): SpeedContextType => {
  const speedContext = useContext(SpeedContext)

  if (!speedContext) {
    throw new Error(
      'SpeedContext has to be used within <SpeedContext.Provider>'
    )
  }

  return speedContext
}

export default useSpeed
