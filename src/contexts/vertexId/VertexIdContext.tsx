import { useRef, createContext, ReactNode } from 'react'

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
  const vertexId = useRef<number>(0)

  const state = vertexId.current

  const set = (newVertexId: number) => {
    vertexId.current = newVertexId
  }

  const get = () => {
    const prevVertexId = vertexId.current++
    return prevVertexId
  }

  const reset = () => {
    vertexId.current = 0
  }

  return (
    <VertexIdContext.Provider value={{ state, get, set, reset }}>
      {children}
    </VertexIdContext.Provider>
  )
}

export { VertexIdContext, VertexIdProvider, type VertexIdContextType }
