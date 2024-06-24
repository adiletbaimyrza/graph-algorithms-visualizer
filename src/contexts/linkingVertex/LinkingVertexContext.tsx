import { useState, createContext, ReactNode } from 'react'
import { TVertex } from '../../types'

interface LinkingVertexContextType {
  state: TVertex | null
  get: () => TVertex | null
  set: (newlinkingVertex: TVertex) => void
  reset: () => void
}

// prettier-ignore
const LinkingVertexContext = createContext<LinkingVertexContextType | undefined>(undefined)

interface LinkingVertexProviderProps {
  children: ReactNode
}

const LinkingVertexProvider = ({ children }: LinkingVertexProviderProps) => {
  const [linkingVertex, setLinkingVertex] = useState<TVertex | null>(null)

  const state = linkingVertex

  const set = (newlinkingVertex: TVertex) => {
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
