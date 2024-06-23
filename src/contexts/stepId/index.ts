import { useContext } from 'react'
import { StepIdContext, StepIdContextType } from './StepIdContext'

const useStepId = (): StepIdContextType => {
  const stepIdContext = useContext(StepIdContext)

  if (!stepIdContext) {
    throw new Error(
      'StepIdContext has to be used within <StepIdContext.Provider>'
    )
  }

  return stepIdContext
}

export default useStepId
