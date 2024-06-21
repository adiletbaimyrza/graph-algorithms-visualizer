import { createContext, ReactNode } from 'react'
import useLinkingVertex from './useLinkingVertex'
import IVertex from '../../interfaces/IVertex'

interface LinkingVertexContextType {
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
  const linkingVertex = useLinkingVertex()

  return (
    <LinkingVertexContext.Provider value={linkingVertex}>
      {children}
    </LinkingVertexContext.Provider>
  )
}

export {
  LinkingVertexContext,
  LinkingVertexProvider,
  type LinkingVertexContextType,
}
