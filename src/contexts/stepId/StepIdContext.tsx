import { useRef, createContext, ReactNode } from 'react'

type StepIdContextType = {
  state: number
  get: () => number
  set: (newStepId: number) => void
  increment: () => StepIdContextType
  decrement: () => StepIdContextType
  forward: () => StepIdContextType
  backward: () => StepIdContextType
  reset: () => void
}

// prettier-ignore
const StepIdContext = createContext<StepIdContextType | undefined>(undefined)

type StepIdProviderProps = {
  children: ReactNode
}

const StepIdProvider = ({ children }: StepIdProviderProps) => {
  const stepId = useRef<number>(0)
  const isForward = useRef<boolean>(true)

  const state = stepId.current

  const set = (newStepId: number) => {
    stepId.current = newStepId
  }

  const get = () => {
    return stepId.current
  }

  const increment = () => {
    stepId.current = stepId.current + 1

    return bulk
  }

  const decrement = () => {
    stepId.current = stepId.current - 1

    return bulk
  }

  const forward = () => {
    if (isForward.current === false) {
      increment()
    }

    isForward.current = true

    return bulk
  }

  const backward = () => {
    if (isForward.current === true) {
      decrement().decrement()
    } else {
      decrement()
    }

    isForward.current = false

    return bulk
  }

  const reset = () => {
    stepId.current = 0
  }

  const bulk = {
    state,
    set,
    get,
    increment,
    decrement,
    forward,
    backward,
    reset,
  }

  return (
    <StepIdContext.Provider value={bulk}>{children}</StepIdContext.Provider>
  )
}

export { StepIdContext, StepIdProvider, type StepIdContextType }
