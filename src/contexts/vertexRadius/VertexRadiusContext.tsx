import { useState, createContext, ReactNode } from 'react'

interface VertexRadiusContextType {
  state: number
  get: () => number
  set: (newVertexRadius: number) => void
}

// prettier-ignore
const VertexRadiusContext = createContext<VertexRadiusContextType | undefined>(undefined)

interface VertexRadiusProviderProps {
  children: ReactNode
}

const VertexRadiusProvider = ({ children }: VertexRadiusProviderProps) => {
  const [vertexRadius, setVertexRadius] = useState<number>(20)

  const state = vertexRadius

  const set = (newVertexRadius: number) => {
    setVertexRadius(newVertexRadius)
  }

  const get = () => {
    return vertexRadius
  }

  return (
    <VertexRadiusContext.Provider value={{ state, get, set }}>
      {children}
    </VertexRadiusContext.Provider>
  )
}

export {
  VertexRadiusContext,
  VertexRadiusProvider,
  type VertexRadiusContextType,
}
