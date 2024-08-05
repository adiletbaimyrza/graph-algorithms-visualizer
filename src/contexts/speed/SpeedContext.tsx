import { useRef, createContext, ReactNode } from 'react'

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
  const speed = useRef<number>(100)

  const state = speed.current

  const set = (newSpeed: number) => {
    speed.current = newSpeed
  }

  const get = () => {
    return speed.current
  }

  return (
    <SpeedContext.Provider value={{ state, get, set }}>
      {children}
    </SpeedContext.Provider>
  )
}

export { SpeedContext, SpeedProvider, type SpeedContextType }
