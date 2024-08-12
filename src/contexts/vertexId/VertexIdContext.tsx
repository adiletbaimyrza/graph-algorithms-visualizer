import { useRef, createContext, ReactNode } from 'react'
import { TVertexID } from '../../types'

interface VertexIdContextType {
  state: TVertexID
  get: () => TVertexID
  set: (newVertexId: TVertexID) => void
  reset: () => void
}

// prettier-ignore
const VertexIdContext = createContext<VertexIdContextType | undefined>(undefined)

interface VertexIdProviderProps {
  children: ReactNode
}

const VertexIdProvider = ({ children }: VertexIdProviderProps) => {
  const vertexId = useRef<TVertexID>(0)

  const state = vertexId.current

  const set = (newVertexId: TVertexID) => {
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
