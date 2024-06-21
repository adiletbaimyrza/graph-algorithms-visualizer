import { createContext, ReactNode } from 'react'
import useVertices from './useVertices'
import IVertex from '../../interfaces/IVertex'

interface VerticesContextType {
  get: () => IVertex[]
  set: (newVertices: IVertex[]) => void
  add: (newVertex: IVertex) => void
  remove: (id: number) => void
}

// prettier-ignore
const VerticesContext = createContext<VerticesContextType | undefined>(undefined)

interface VerticesProviderProps {
  children: ReactNode
}

const VerticesProvider = ({ children }: VerticesProviderProps) => {
  const vertices = useVertices()

  return (
    <VerticesContext.Provider value={vertices}>
      {children}
    </VerticesContext.Provider>
  )
}

export { VerticesContext, VerticesProvider, type VerticesContextType }
