import { useRef, createContext, ReactNode } from 'react'

interface EdgeIdContextType {
  state: number
  get: () => number
  set: (newEdgeId: number) => void
  reset: () => void
}

// prettier-ignore
const EdgeIdContext = createContext<EdgeIdContextType | undefined>(undefined)

interface EdgeIdProviderProps {
  children: ReactNode
}

const EdgeIdProvider = ({ children }: EdgeIdProviderProps) => {
  const edgeId = useRef<number>(0)

  const state = edgeId.current

  const set = (newEdgeId: number) => {
    edgeId.current = newEdgeId
  }

  const get = () => {
    const prevEdgeId = edgeId.current++
    return prevEdgeId
  }

  const reset = () => {
    edgeId.current = 0
  }

  return (
    <EdgeIdContext.Provider value={{ state, set, get, reset }}>
      {children}
    </EdgeIdContext.Provider>
  )
}

export { EdgeIdContext, EdgeIdProvider, type EdgeIdContextType }
