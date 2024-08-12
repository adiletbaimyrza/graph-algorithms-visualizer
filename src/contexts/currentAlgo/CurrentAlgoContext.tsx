import { useState, createContext, ReactNode } from 'react'
import { TAlgorithm } from '../../types'

interface CurrentAlgoContextType {
  state: TAlgorithm
  get: () => TAlgorithm
  set: (newAlgo: TAlgorithm) => void
}

// prettier-ignore
const CurrentAlgoContext = createContext<CurrentAlgoContextType | undefined>(undefined)

interface CurrentAlgoProviderProps {
  children: ReactNode
}

const CurrentAlgoProvider = ({ children }: CurrentAlgoProviderProps) => {
  const [currentAlgo, setCurrentAlgo] = useState<TAlgorithm>('dfs')

  const state = currentAlgo

  const set = (newAlgo: TAlgorithm) => {
    setCurrentAlgo(newAlgo)
  }

  const get = () => {
    return currentAlgo
  }

  return (
    <CurrentAlgoContext.Provider value={{ state, set, get }}>
      {children}
    </CurrentAlgoContext.Provider>
  )
}

export { CurrentAlgoContext, CurrentAlgoProvider, type CurrentAlgoContextType }
