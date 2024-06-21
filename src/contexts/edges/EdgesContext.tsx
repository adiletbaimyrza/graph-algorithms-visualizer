import { createContext, ReactNode } from 'react'
import useEdges from './useEdges'
import IEdge from '../../interfaces/IEdge'

interface EdgesContextType {
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
  const edges = useEdges()

  return <EdgesContext.Provider value={edges}>{children}</EdgesContext.Provider>
}

export { EdgesContext, EdgesProvider, type EdgesContextType }
