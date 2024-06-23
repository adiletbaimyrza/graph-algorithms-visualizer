import { useState, createContext, ReactNode } from 'react'
import IVertex from '../../interfaces/IVertex'

interface LinkingVertexContextType {
  state: IVertex | null
  get: () => IVertex | null
  set: (newlinkingVertex: IVertex) => void
  reset: () => void
}

// prettier-ignore
const LinkingVertexContext = createContext<LinkingVertexContextType | undefined>(undefined)

interface LinkingVertexProviderProps {
  children: ReactNode
}

const LinkingVertexProvider = ({ children }: LinkingVertexProviderProps) => {
  const [linkingVertex, setLinkingVertex] = useState<IVertex | null>(null)

  const state = linkingVertex

  const set = (newlinkingVertex: IVertex) => {
    setLinkingVertex(newlinkingVertex)
  }

  const get = () => {
    return linkingVertex
  }

  const reset = () => {
    setLinkingVertex(null)
  }

  return (
    <LinkingVertexContext.Provider value={{ state, get, set, reset }}>
      {children}
    </LinkingVertexContext.Provider>
  )
}

export {
  LinkingVertexContext,
  LinkingVertexProvider,
  type LinkingVertexContextType,
}
