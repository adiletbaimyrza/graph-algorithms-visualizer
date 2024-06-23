import { useState, createContext, ReactNode } from 'react'
import IEdge from '../../interfaces/IEdge'

interface EdgesContextType {
  state: IEdge[]
  get: () => IEdge[]
  set: (newEdges: IEdge[]) => void
  add: (newEdge: IEdge) => void
  remove: (id: number) => void
}

// prettier-ignore
const EdgesContext = createContext<EdgesContextType | undefined>(undefined)

interface EdgesProviderProps {
  children: ReactNode
}

const EdgesProvider = ({ children }: EdgesProviderProps) => {
  const [edges, setEdges] = useState<IEdge[]>([])

  const state = edges

  const get = () => {
    return edges
  }

  const set = (newEdges: IEdge[]) => {
    setEdges(newEdges)
  }

  const add = (newEdge: IEdge) => {
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
