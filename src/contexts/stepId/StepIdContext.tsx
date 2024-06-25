import { useState, createContext, ReactNode } from 'react'

type StepIdContextType = {
  state: number
  get: () => number
  set: (newStepId: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
}

// prettier-ignore
const StepIdContext = createContext<StepIdContextType | undefined>(undefined)

type StepIdProviderProps = {
  children: ReactNode
}

const StepIdProvider = ({ children }: StepIdProviderProps) => {
  const [stepId, setStepId] = useState<number>(0)

  const state = stepId

  const set = (newStepId: number) => {
    setStepId(newStepId)
  }

  const get = () => {
    return stepId
  }

  const increment = () => {
    setStepId(stepId + 1)
  }

  const decrement = () => {
    setStepId(stepId - 1)
  }

  const reset = () => {
    setStepId(0)
  }

  return (
    <StepIdContext.Provider
      value={{ state, set, get, increment, decrement, reset }}
    >
      {children}
    </StepIdContext.Provider>
  )
}

export { StepIdContext, StepIdProvider, type StepIdContextType }
