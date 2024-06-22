import { createContext, ReactNode } from 'react'
import useVertexRadius from './useVertexRadius'

interface VertexRadiusContextType {
  get: () => number
  set: (newVertexRadius: number) => void
}

// prettier-ignore
const VertexRadiusContext = createContext<VertexRadiusContextType | undefined>(undefined)

interface VertexRadiusProviderProps {
  children: ReactNode
}

const VertexRadiusProvider = ({ children }: VertexRadiusProviderProps) => {
  const vertexRadius = useVertexRadius()

  return (
    <VertexRadiusContext.Provider value={vertexRadius}>
      {children}
    </VertexRadiusContext.Provider>
  )
}

export {
  VertexRadiusContext,
  VertexRadiusProvider,
  type VertexRadiusContextType,
}
