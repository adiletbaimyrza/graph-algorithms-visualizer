import { useState, createContext, ReactNode } from 'react'
import { TAlgo } from '../../types'

interface CurrentAlgoContextType {
  state: TAlgo
  get: () => TAlgo
  set: (newAlgo: TAlgo) => void
}

// prettier-ignore
const CurrentAlgoContext = createContext<CurrentAlgoContextType | undefined>(undefined)

interface CurrentAlgoProviderProps {
  children: ReactNode
}

const CurrentAlgoProvider = ({ children }: CurrentAlgoProviderProps) => {
  const [currentAlgo, setCurrentAlgo] = useState<TAlgo>('dfs')

  const state = currentAlgo

  const set = (newAlgo: TAlgo) => {
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
