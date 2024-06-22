import { createContext, ReactNode } from 'react'
import useVertexId from './useVertexId'

interface VertexIdContextType {
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
  const vertexId = useVertexId()

  return (
    <VertexIdContext.Provider value={vertexId}>
      {children}
    </VertexIdContext.Provider>
  )
}

export { VertexIdContext, VertexIdProvider, type VertexIdContextType }
