import { useState, createContext, ReactNode } from 'react'
import { AlgoType } from '../../interfaces'

interface CurrentAlgoContextType {
  state: AlgoType
  get: () => AlgoType
  set: (newAlgo: AlgoType) => void
}

// prettier-ignore
const CurrentAlgoContext = createContext<CurrentAlgoContextType | undefined>(undefined)

interface CurrentAlgoProviderProps {
  children: ReactNode
}

const CurrentAlgoProvider = ({ children }: CurrentAlgoProviderProps) => {
  const [currentAlgo, setCurrentAlgo] = useState<AlgoType>('dfs')

  const state = currentAlgo

  const set = (newAlgo: AlgoType) => {
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
