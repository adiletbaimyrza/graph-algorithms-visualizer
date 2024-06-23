import { useState, createContext, ReactNode } from 'react'
import IVertex from '../../interfaces/IVertex'

interface VerticesContextType {
  state: IVertex[]
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
  const [vertices, setVertices] = useState<IVertex[]>([])

  const state = vertices

  const get = () => {
    return vertices
  }

  const set = (newVertices: IVertex[]) => {
    setVertices(newVertices)
  }

  const add = (newVertex: IVertex) => {
    const updatedVertices = [...vertices, newVertex]
    setVertices(updatedVertices)
  }

  const remove = (id: number) => {
    const filteredVertices = vertices.filter((vertex) => vertex.id !== id)
    setVertices(filteredVertices)
  }

  return (
    <VerticesContext.Provider value={{ state, get, set, add, remove }}>
      {children}
    </VerticesContext.Provider>
  )
}

export { VerticesContext, VerticesProvider, type VerticesContextType }
