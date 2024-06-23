import { useState, createContext, ReactNode } from 'react'

interface StepIdContextType {
  state: number
  get: () => number
  set: (newStepId: number) => void
  reset: () => void
}

// prettier-ignore
const StepIdContext = createContext<StepIdContextType | undefined>(undefined)

interface StepIdProviderProps {
  children: ReactNode
}

const StepIdProvider = ({ children }: StepIdProviderProps) => {
  const [stepId, setStepId] = useState<number>(0)

  const state = stepId

  const set = (newStepId: number) => {
    setStepId(newStepId)
  }

  const get = () => {
    const prevStepId = stepId
    setStepId(stepId + 1)

    return prevStepId
  }

  const reset = () => {
    setStepId(0)
  }

  return (
    <StepIdContext.Provider value={{ state, set, get, reset }}>
      {children}
    </StepIdContext.Provider>
  )
}

export { StepIdContext, StepIdProvider, type StepIdContextType }
