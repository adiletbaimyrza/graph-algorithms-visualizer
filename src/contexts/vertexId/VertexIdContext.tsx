import { useState, createContext, ReactNode } from 'react'

interface VertexIdContextType {
  state: number
  get: () => number
  set: (newVertexId: number) => void
  reset: () => void
}

// prettier-ignore
const VertexIdContext = createContext<VertexIdContextType | undefined>(undefined)

interface VertexIdProviderProps {
  children: ReactNode
}

const VertexIdProvider = ({ children }: VertexIdProviderProps) => {
  const [vertexId, setVertexId] = useState<number>(0)

  const state = vertexId

  const set = (newVertexId: number) => {
    setVertexId(newVertexId)
  }

  const get = () => {
    const prevVertexId = vertexId
    setVertexId(vertexId + 1)

    return prevVertexId
  }

  const reset = () => {
    setVertexId(0)
  }

  return (
    <VertexIdContext.Provider value={{ state, get, set, reset }}>
      {children}
    </VertexIdContext.Provider>
  )
}

export { VertexIdContext, VertexIdProvider, type VertexIdContextType }
