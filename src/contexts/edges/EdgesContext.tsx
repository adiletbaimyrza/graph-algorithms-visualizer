import { useState, createContext, ReactNode } from 'react'
import TEdge from '../../types/TEdge'

interface EdgesContextType {
  state: TEdge[]
  get: () => TEdge[]
  set: (newEdges: TEdge[]) => void
  add: (newEdge: TEdge) => void
  remove: (id: number) => void
}

// prettier-ignore
const EdgesContext = createContext<EdgesContextType | undefined>(undefined)

interface EdgesProviderProps {
  children: ReactNode
}

const EdgesProvider = ({ children }: EdgesProviderProps) => {
  const [edges, setEdges] = useState<TEdge[]>([])

  const state = edges

  const get = () => {
    return edges
  }

  const set = (newEdges: TEdge[]) => {
    setEdges(newEdges)
  }

  const add = (newEdge: TEdge) => {
    const updatedEdges = [...edges, newEdge]
    setEdges(updatedEdges)
  }

  const remove = (id: number) => {
    const filteredEdges = edges.filter((edge) => edge.id !== id)
    setEdges(filteredEdges)
  }

  return (
    <EdgesContext.Provider value={{ state, get, set, add, remove }}>
      {children}
    </EdgesContext.Provider>
  )
}

export { EdgesContext, EdgesProvider, type EdgesContextType }
