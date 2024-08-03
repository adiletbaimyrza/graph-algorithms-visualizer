import { useRef, createContext, ReactNode } from 'react'

interface IsAnimatingContextType {
  state: boolean
  get: () => boolean
  set: (newIsAnimatingValue: boolean) => void
  reset: () => void
}

// prettier-ignore
const IsAnimatingContext = createContext<IsAnimatingContextType | undefined>(undefined)

interface IsAnimatingProviderProps {
  children: ReactNode
}

const IsAnimatingProvider = ({ children }: IsAnimatingProviderProps) => {
  const isAnimating = useRef<boolean>(false)

  const state = isAnimating.current

  const set = (newIsAnimatingValue: boolean) => {
    isAnimating.current = newIsAnimatingValue
  }

  const get = () => {
    return isAnimating.current
  }

  const reset = () => {
    isAnimating.current = false
  }

  return (
    <IsAnimatingContext.Provider value={{ state, get, set, reset }}>
      {children}
    </IsAnimatingContext.Provider>
  )
}

export { IsAnimatingContext, IsAnimatingProvider, type IsAnimatingContextType }
