import { useState, createContext, ReactNode } from 'react'

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
  const [edgeId, setEdgeId] = useState<number>(0)

  const state = edgeId

  const set = (newEdgeId: number) => {
    setEdgeId(newEdgeId)
  }

  const get = () => {
    const prevEdgeId = edgeId
    setEdgeId(edgeId + 1)

    return prevEdgeId
  }

  const reset = () => {
    setEdgeId(0)
  }

  return (
    <EdgeIdContext.Provider value={{ state, set, get, reset }}>
      {children}
    </EdgeIdContext.Provider>
  )
}

export { EdgeIdContext, EdgeIdProvider, type EdgeIdContextType }
