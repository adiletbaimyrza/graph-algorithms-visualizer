import { useState, createContext, ReactNode } from 'react'

interface SpeedContextType {
  state: number
  get: () => number
  set: (newSpeed: number) => void
}

// prettier-ignore
const SpeedContext = createContext<SpeedContextType | undefined>(undefined)

interface SpeedProviderProps {
  children: ReactNode
}

const SpeedProvider = ({ children }: SpeedProviderProps) => {
  const [speed, setSpeed] = useState<number>(1)

  const state = speed

  const set = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const get = () => {
    return speed
  }

  return (
    <SpeedContext.Provider value={{ state, get, set }}>
      {children}
    </SpeedContext.Provider>
  )
}

export { SpeedContext, SpeedProvider, type SpeedContextType }
