import { useState, createContext, ReactNode } from 'react'
import { TVertex } from '../../types'

interface VerticesContextType {
  state: TVertex[]
  get: () => TVertex[]
  set: (newVertices: TVertex[]) => void
  add: (newVertex: TVertex) => void
  remove: (id: number) => void
  reset: () => void
}

// prettier-ignore
const VerticesContext = createContext<VerticesContextType | undefined>(undefined)

interface VerticesProviderProps {
  children: ReactNode
}

const VerticesProvider = ({ children }: VerticesProviderProps) => {
  const [vertices, setVertices] = useState<TVertex[]>([])

  const state = vertices

  const get = () => {
    return vertices
  }

  const set = (newVertices: TVertex[]) => {
    setVertices(newVertices)
  }

  const add = (newVertex: TVertex) => {
    const updatedVertices = [...vertices, newVertex]
    setVertices(updatedVertices)
  }

  const remove = (id: number) => {
    const filteredVertices = vertices.filter((vertex) => vertex.id !== id)
    setVertices(filteredVertices)
  }

  const reset = () => {
    setVertices([])
  }

  return (
    <VerticesContext.Provider value={{ state, get, set, add, remove, reset }}>
      {children}
    </VerticesContext.Provider>
  )
}

export { VerticesContext, VerticesProvider, type VerticesContextType }
